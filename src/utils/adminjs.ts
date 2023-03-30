import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import AdminJS from "adminjs";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";

AdminJS.registerAdapter({
	Resource: AdminJSMongoose.Resource,
	Database: AdminJSMongoose.Database,
});

const adminOptions = {
	// We pass Category to `resources`
	resources: [
		{
			resource: userModel,
			options: {
				listProperties: ["name", "email", "role"],
				sort: {
					sortBy: "createdAt",
					direction: "desc",
				},
				actions: {
					new: {
						before: [
							async (request: any, _context: any) => {
								//encrypt password
								request.payload.password = await bcrypt.hash(
									request.payload.password,
									10
								);
								return request;
							},
						],
					},
					edit: {
						before: [
							async (request: any, _context: any) => {
								//encrypt password
								if (request.payload.password) {
									request.payload.password =
										await bcrypt.hash(
											request.payload.password,
											10
										);
								}
								return request;
							},
						],
					},
				},
			},
		},
	],
};

const adminJS = new AdminJS(adminOptions);
adminJS.watch();

export default AdminJSExpress.buildAuthenticatedRouter(adminJS, {
	authenticate: (email: any, password: any) => {
		if (
			email == "la@gang-of-fork.de" &&
			password == (process.env.ADMINJS_PASSWORD as string)
		) {
			return true;
		}

		return false;
	},
	cookiePassword: "session Key",
});
