import User from './models/User';

const loginUser = body => {
    return new Promise (resolve => {
        const userWithUsernameModel = new User(body)
        .fetch()
        .then(userWithUsername => {
            if (userWithUsername) {
                resolve({
                    status: 200,
                    body: {
                        firstName: userWithUsername.get('firstName'),
                        lastName: userWithUsername.get('lastName'),
                        email: userWithUsername.get('email'),
                        username: userWithUsername.get('username')
                    }
                });
            } else {
                const userWithEmailModel = new User({
                    email: body.username,
                    password: body.password
                }).fetch().then(userWithEmail => {
                    if(userWithEmail) {
                        resolve({
                            status: 200,
                            body: {
                                firstName: userWithEmail.get('firstName'),
                                lastName: userWithEmail.get('lastName'),
                                email: userWithEmail.get('email'),
                                username: userWithEmail.get('username')
                            }
                        });
                    } else {
                        resolve({ status: 401 });
                    }
                });
            }
        });
    });
}

export default async body => {
    const response = await loginUser(body);
    return response;
}
