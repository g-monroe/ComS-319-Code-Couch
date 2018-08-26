import Story from './models/Story';

const fetchCards = body => {
    console.log("yessssssss");
    return new Promise(resolve => {
        new Story().fetchAll().then(storyArr => {
            const storyData = [];
            storyArr.serialize().forEach(story => {
                storyData.push({
                    title: story.Title,
                    story: story.Story
                });
            });

            resolve({
                status: 200,
                body: storyData
            });
        });
    });
}

export default async body => {
    const response = await fetchCards(body);
    return response;
}
