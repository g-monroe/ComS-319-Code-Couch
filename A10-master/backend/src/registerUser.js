import User from './models/User';

const registerUser = body => {
    return new Promise(resolve => {
        const userModel = new User({
            username: body.username,
            email: body.email
        }).fetch().then(user => {
            if (user) {
                resolve({ status: 403 });
            } else {
                const newUser = new User(Object.assign({}, body))
                    .save()
                    .then(newUserModel => {
                        resolve({
                            status: 200,
                            body: {
                                firstName: newUserModel.get('firstName'),
                                lastName: newUserModel.get('lastName'),
                                email: newUserModel.get('email'),
                                username: newUserModel.get('username')
                            }
                        });
                    });
            }
        });
    });
}

export default async body => {
    const response = await registerUser(body);
    return response;
}
