from flask import request, session, redirect, jsonify
from flask_restful import Resource
from cas import CASClient
from urllib.parse import urlencode

# Create a CASClient object
encode_path = urlencode({'next': '/profile'})
cas_client = CASClient(
    version=3,
    service_url=f'http://localhost:3000/profile?{encode_path}',
    server_url=('https://secure6.its.yale.edu/cas/login?'
                'service=https://localhost:55555/index')
)
    
class Login(Resource):
    def get(self):
        if 'username' in session:
            # Already logged in
            response = jsonify({"message": f"Already logged in as {session['username']}!"})
            response.status_code = 200
            return response

        ticket = request.args.get('ticket')
        if not ticket:
            # No ticket, the request come from end user, send to CAS login
            cas_login_url = cas_client.get_login_url()
            # app.logger.debug('CAS login URL: %s', cas_login_url)
            return ({"login_url" :cas_login_url})

        # There is a ticket, the request come from CAS as callback.
        # need call `verify_ticket()` to validate ticket and get user profile.
        # app.logger.debug('ticket: %s', ticket)
        # app.logger.debug('next: %s', next)

        user, attributes, pgtiou = cas_client.verify_ticket(ticket)

        # app.logger.debug(
        #      'CAS verify ticket response: user: %s, attributes: %s, pgtiou: %s', user, attributes, pgtiou)

        if not user:
            return 'Failed to verify ticket. <a href="/login">Login</a>'
        else:  
        # Login successfully, redirect back to home page
            session['username'] = user
            response = jsonify({"message": f"Successfully logged in as {user}"})
            response.status_code = 200
            return response

class Logout(Resource):
    def get(self):
        redirect_url = "http://localhost:5000/logout_callback"
        cas_logout_url = cas_client.get_logout_url(redirect_url)
        # app.logger.debug('CAS logout URL: %s', cas_logout_url)

        return redirect(cas_logout_url)

class LogoutCallBack(Resource):
    def get(self):
        session.pop('username', None)
        return redirect('http://localhost:3000/')