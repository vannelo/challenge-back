## Callenge Backend App

This is a Dockerized nodejs app built using Node.js, Apollo Server and TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed:

Docker

Node.js


## Getting Started

In your terminal window follow these steps:

1. Clone the Repository:
   
git clone https://github.com/vannelo/challenge-back/

3. Enter the repo folder and build the Docker Image:

cd challenge-back

docker build -t challenge-back .

5. Run the Docker Container:

docker run -p 4000:4000 -d challenge-back

The application will be accessible at http://localhost:4000/graphql






