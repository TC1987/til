# TodayILearned

<p align="middle">
  <img src="https://user-images.githubusercontent.com/23731295/74123318-3e862880-4b83-11ea-9f9b-5dd6589f94ec.jpg" width="210" />
  <img src="https://user-images.githubusercontent.com/23731295/74123321-41811900-4b83-11ea-8560-63f9ab82ba0c.jpg" width="210" /> 
  <img src="https://user-images.githubusercontent.com/23731295/74123324-45ad3680-4b83-11ea-89b1-f03c7afeeba7.jpg" width="210" />
  <img src="https://user-images.githubusercontent.com/23731295/74123323-43e37300-4b83-11ea-892d-12425e06e2cc.jpg" width="210" />
</p>

TIL is a blog that was created to allow users to post whatever they'd like about programming/tech. Both frontend and backend is powered by Javascript (you know, the best language ever :D).

## Getting Started

These instructions will get a copy of the project up and running on your local machine for development and testing purposes.

```
1. Clone or download both til_frontend and til_backend into the same directory.
2. Create a .env file in til_backend. Copy and paste the following and replace '###' with a valid MongoDB connection string. If you don't have one, I'd highly recommend creating an account on [Atlas](https://www.mongodb.com/cloud/atlas). It's free!
	PORT=3001
	MONGODB_URI=###
	SECRET=s3cr3t
3. Navigate to the til_frontend directory using your favorite terminal and type 'npm i'.
4. Do step 3 again but in the til_backend directory.
5. Now that all of the project's dependencies are installed, type 'npm run build:local'. It is important that you are in the til_backend directory when you do this.
6. Open your browser of choice and make your way to http://localhost:3001
```

### Prerequisites

1. Got Node? If so, you're golden! If not, grab it [here](https://nodejs.org/en/download/). It comes with npm which is needed to manage the project's dependencies and execute scripts.
2. If you have MongoDB, just grab the connection string and paste it into the .env file created above. If not, get it [here](https://www.mongodb.com/download-center/community).

## Running Tests

Tests can be run with 'npm test'.

## Built With

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)

## License

Nada. Take it and do whatever you'd like with it!
