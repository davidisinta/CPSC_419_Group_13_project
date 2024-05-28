## Table Of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Additional Features](#additional-features)
- [Running the Frontend](#running-the-frontend)
- [Running the Backend](#running-the-backend)

## Project Overview

We are developing a web application with two primary objectives: to assist STC cluster technicians (CTs) in effectively managing inventory through an intuitive interface and to automate the process of assigning CTs to specific locations within a campus cluster. 

Cluster technicians are tasked with maintaining printers and computers at various locations across campus, each divided into four zones. These zones typically encompass eight locations and a central hub. At each location, CTs manage items such as printers, paper, toner, computers, and peripherals. 

Traditionally, CTs determine their shift locations independently, visiting around four locations per shift within their designated zone. At the end of each shift, CTs must manually create a shift report including a list of all of the places they visited and what they accomplished at each location. Our goal is to streamline this process, automating shift reports and facilitating inventory and printer status updates.

We also provide a public interface for students to see Yale's printer statuses on a main dashboard and interactive map. Students can view toner levels and printer statuses as well as report any problems encountered.

## Tech Stack
- **React JS**: Frontend User Interface
- **PostgreSQL**: Database Management
- **Flask**: Backend Development
- **Docker**: Tooling (consistent builds across different machines)

## Additional Features
- **General User Side**: Interface for users to see location statuses and upvote location priority.
- **Cluster Tech Side**: Interface for CTs to view assigned locations and update inventory counts.
- **Admin Side**: Interface for administrators to interact with the location scheduling algorithm and manage system settings.

## Running the Frontend

To run the frontend locally, follow these steps:
- From root directory, Navigate to the frontend directory `cd /frontend`.
- Install project dependencies: `npm install`.
- Build the app: `npm run build`.
- Install serve package (if not already installed): `npm install -g serve`.
- Serve the built application: `serve -s build -l 3000`. After running these commands, your frontend application should be accessible in a web browser at [http://localhost:3000](http://localhost:3000).

## Running the Backend

To run the frontend locally, follow these steps:
- From root directory, Navigate to the backend directory `cd /backend`.
- Install project dependencies: `pip install -r requirements.txt`.
- To run the app: `flask run`.
