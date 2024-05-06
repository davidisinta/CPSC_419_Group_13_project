## Table Of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Additional Features](#additional-features)
- [Running the Frontend](#running-the-frontend)
- [Running the Backend](#running-the-backend)


---

## Project Overview

We are developing a web application with two primary objectives: to assist STC cluster technicians (CTs) in effectively managing inventory through an intuitive interface and to automate the process of assigning CTs to specific locations within a campus cluster. 

Cluster technicians are tasked with maintaining printers and computers at various locations across campus, each divided into four zones. These zones typically encompass eight locations and a central hub. At each location, CTs manage items such as printers, paper, toner, computers, and peripherals. 

Traditionally, CTs determine their shift locations independently, visiting around four locations per shift within their designated zone. At the end of each shift, CTs must manually create a shift report including a list of all of the places they visited and what they accomplished at each location. Our goal is to streamline this process, automating shift reports and facilitating inventory and printer status updates.

We also provide a public interface for students to see Yale's printer statuses on a main dashboard and interactive map. Students can view toner levels and printer statuses as well as report any problems encountered.

## Tech Stack
- **React JS**: Frontend User Interface
- **PostgreSQL**: Database Management
- **Flask**: Backend Development

## Additional Features
- **General User Side**: Interface for users to see location statuses and upvote location priority.
- **Cluster Tech Side**: Interface for CTs to view assigned locations and update inventory counts.
- **Admin Side**: Interface for administrators to assign/modify tasks for cluster techs manually.

## Running the Frontend

To run the frontend locally, follow these steps:
- From root directory, Navigate to the frontend directory `cd /frontend`.
- Install project dependencies: `npm install`.
- Build the app: `npm run build`.
- Install serve package (if not already installed): `npm install -g serve`.
- Serve the built application: `serve -s build -l 3000`. After running these commands, your frontend application should be accessible in a web browser at [http://localhost:3000](http://localhost:3000).

## Running the Backend

Requirements for the backend can be installed to your virtual environment using `pip install -r requirements.txt` in the backend directory.
To run the app, run `flask run` in the backend directory.
The app should pull up ready to use. 
We have granted Alan's netid admin privileges for full view of the capabilities of our app.
Please reach out to fisher.marks@yale.edu for a quick response if there are any difficulties.

A copy of our database schema can be found in the stc.sql file in the backend directory. The database is being hosted through neon, which can be found here: [neon](https://console.neon.tech/app/projects/frosty-darkness-11741169). Alan's email should have access to view the project for a more readable view of our database. There might be leftover rows in the shift table that don't make a lot of sense when testing with Postman, but doesn't affect the accuracy or functionality of the app so can be disregarded.

- **Admin Side**: Interface for administrators to interact with the location scheduling algorithm and manage system settings.


