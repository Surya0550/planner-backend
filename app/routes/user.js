const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    app.get(`${baseUrl}/view/all/normal`, auth.isAuthorized, userController.getAllNormalUser);

    /**
	 * @api {get} /api/v1/users/view/all/normal Get all Normal Users
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Normal User Details Found",
	    "status": 200,
	    "data": [
					{
                        "admin": 0,
                        "createdOn": "2019-09-03T05:05:47.000Z",
                        "mobileNumber": 4695258541,
                        "email": "something@gmail.com",
                        "password": "$2a$10$2p4rtxyD4eV/8e2GjEkqzujcMFW4QO5y0WKC5zRrhIQico7Tmx6HC",
                        "lastName": "V",
                        "firstName": "Hari",
                        "userId": "tP8Bbn6_n"
					}
	    		]
	    }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Normal User Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(`${baseUrl}/event/add`, userController.eventAddFunction);

    /**
	 * @api {post} /api/v1/users/event/add Post an Event for the user.
	 * @apiVersion 0.0.1
	 * @apiGroup add
	 *
     * @apiParam {String} userId The userId of the user to which this event is to be attached is passed as a body parameter
	 * @apiParam {String} title The title of the event passed as a body parameter
     * @apiParam {String} date The date of the event in format: "September 10, 2019" passed as a body parameter
     * @apiParam {String} place The place of the event passed as a body parameter
     * @apiParam {String} purpose The purpose of the event passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Event Details Added",
	    "status": 200,
	    "data": 
			    {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
				}
	    		
	    }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Add Event",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(`${baseUrl}/email`, userController.getSingleUserEmailId);

    /**
	 * @api {get} /api/v1/users/email Get email for the user.
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
     * @apiParam {String} userId The userId of the user passed as a query parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "admin": 0,
            "createdOn": "2019-09-03T05:16:31.000Z",
            "mobileNumber": 54521515421,
            "email": "something@gmail.com",
            "lastName": "S",
            "firstName": "Sai Surya Teja",
            "userId": "yCg3kwZUS"
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Get EmailId",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(`${baseUrl}/send/email`, userController.mailFunction);

    /**
	 * @api {get} /api/v1/users/send/email Send a mail for the given email.
	 * @apiVersion 0.0.1
	 * @apiGroup add
	 *
     * @apiParam {String} email The email of the user to which the mail should be sent is passed as a query parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  { 
        accepted: [ 'something@gmail.com' ],
        rejected: [],
        envelopeTime: 705,
        messageTime: 825,
        messageSize: 328,
        response: '250 2.0.0 OK  1567694803 s2sm2053088pjq.0 - gsmtp',
        envelope:
        { from: 'somebody@gmail.com',
            to: [ 'something@gmail.com' ] },
        messageId: '<42991792-6f76-2179-f106-0f89e870c2fe@gmail.com>'
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * { 
        Error: Invalid login: 535-5.7.8

        code: 'EAUTH',
        response: '535-5.7.8 ,
        responseCode: 535,
        command: 'AUTH PLAIN' 
       }
	 */

    app.get(`${baseUrl}/event/detail`, userController.getSingleUserEvent);

    /**
	 * @api {get} /api/v1/users/event/detail Get the Event details for a user.
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
     * @apiParam {String} userId The userId of the user passed as a query parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            _id: "5d6fef9e938066079cb140d0"
            userEvents: [
                {
                    "_id": "5d6fef9e938066079cb140d1",
                    "purpose": "Sample Purpose 1",
                    "place": "Hyderabad",
                    "date": "September 12, 2019",
                    "title": "Surya Event 1",
                    "id": "Af62Uhj0R"
                }
                
            ]
            "userId": "XicTV0oqR",
            "__v": 0
	    		
	    }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Get Event Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(`${baseUrl}/event/single/detail`, userController.getSingleEventFromUser)

    /**
	 * @api {get} /api/v1/users/event/single/detail Get an Event detail for the user.
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
     * @apiParam {String} id The id of the event passed as a query parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "id": "-rFM-Ofi9",
            "title": "Created through Add",
            "date": "September 29, 2019",
            "place": "Sample Place",
            "purpose": "Sample Purpose",
            "_id": "5d7140b8bf93a63d8847906f"
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Get Single Event Detail",
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(`${baseUrl}/event`, userController.eventFunction);

    /**
	 * @api {post} /api/v1/users/event Create an Event for the user.
	 * @apiVersion 0.0.1
	 * @apiGroup add
	 *
     * @apiParam {String} userId The userId of the user to which this event is to be created is passed as a body parameter
	 * @apiParam {Array} userEvents The array of events passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            _id: "5d6fef9e938066079cb140d0"
            userEvents: [
                {
                    "_id": "5d6fef9e938066079cb140d1",
                    "purpose": "Sample Purpose 1",
                    "place": "Hyderabad",
                    "date": "September 12, 2019",
                    "title": "Surya Event 1",
                    "id": "Af62Uhj0R"
                }
                
            ]
            "userId": "XicTV0oqR",
            "__v": 0
	    		
	    }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Create Event",
	    "status": 500,
	    "data": null
	   }
	 */

    
    // params: firstName, lastName, email, mobileNumber, password, apiKey.
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
	 * @api {post} /api/v1/users/signup signup for the user.
	 * @apiVersion 0.0.1
	 * @apiGroup add
	 *
     * @apiParam {String} firstName The firstName of the user passed as a body parameter
	 * @apiParam {String} lastName The lastName of the user passed as a body parameter
     * @apiParam {String} email The email of the user passed as a body parameter
     * @apiParam {String} countryCode The countryCode of the user passed as a body parameter
     * @apiParam {String} mobileNumber The mobileNumber of the user passed as a body parameter
     * @apiParam {String} password The password of the user passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "5d714ecfbf93a63d88479071",
                "admin": 0,
                "createdOn": "2019-09-05T18:07:11.000Z",
                "mobileNumber": 7052678980,
                "email": "something@gmail.com",
                "lastName": "Ss",
                "firstName": "Suryas",
                "userId": "H19sIDnlB"
            }
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Create User",
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup add
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "S",
                "firstName": "Surya",
                "userId": "-E9zxTYA8"
                }
            }

        }
       @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find User Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.put(`${baseUrl}/event/edit/:id`, userController.editSingleEvent);

    /**
	 * @api {put} /api/v1/users/event/edit/:id edit an event for the user.
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
     * @apiParam {String} id The eventId of the event passed as a params parameter
	 * @apiParam {String} title The title of the event passed as a body parameter
     * @apiParam {String} date The date of the event in format: "September 10, 2019" passed as a body parameter
     * @apiParam {String} place The place of the event passed as a body parameter
     * @apiParam {String} purpose The purpose of the event passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "SingleEvent details edited",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed to edit SingleEvent details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.put(`${baseUrl}/event/delete/:id`, userController.deleteSingleEvent);

    /**
	 * @api {put} /api/v1/users/event/delete/:id delete an event for the user.
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
     * @apiParam {String} id The eventId of the event passed as a params parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "Deleted the SingleEvent successfully",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed to delete SingleEvent details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

    /**
     * @apiGroup add
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout api for user logout.
     *
     * @apiParam {string} authToken To authenticate. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Logged out Successfully",
            "status": 200,
            "data": null
        }
       @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "error occured : 'error message'",
	    "status": 500,
	    "data": null
	   }
	 */



}
