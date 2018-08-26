import addUserM from './models/addUserM';

const userAdd = body => {
    return new Promise(resolve => {
        const addUserModel = new addUserM({
            userAdd: body.userAdd,
            projectAdd: body.projAdd
        }).fetch().then(user => {
            if(user) {
                resolve({ status: 403 });
            } else {
                const newAddUser = new addUserM({
                    userAdd: body.userAdd,
                    projectAdd: body.projAdd
                })
                    .save()
                    .then(newUserModel => {
                        resolve({
                            status: 200,
                            body: {
                                userAdd: newUserModel.get('userAdd'),
                                projectAdd: newUserModel.get('projectAdd')
                            }
                        });
                    });
            }
        });
    });
}

export default async body => {
    const response = await userAdd(body);
    return response;
}
