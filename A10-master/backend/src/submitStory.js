import Story from './models/Story';

const submitStory = body => {
    console.log("yessssssss");
    return new Promise(resolve => {
        const storyModel = new Story({
            title: body.title,
            story: body.story
        }).fetch().then(story => {
            if (story) {
                resolve({ status: 403 });
            } else {
                const newStory = new Story(Object.assign({}, body))
                    .save()
                    .then(newStoryModel => {
                        resolve({
                            status: 200,
                            body: {
                                story: newStoryModel.get('story'),
                                title: newStoryModel.get('title')
                            }
                        });
                    });
            }
        });
    });
}

export default async body => {
    const response = await submitStory(body);
    return response;
}
