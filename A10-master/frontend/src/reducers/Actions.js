let i = 0;

export default {
    login: {
        setUsername: i++,
        setPassword: i++,
        toggleModal: i++,
        setFormError: i++
    },
    register: {
        setUsername: i++,
        setEmail: i++,
        setPassword: i++,
        setConfirmPassword: i++,
        setFirstName: i++,
        setLastName: i++,
        toggleModal: i++,
        setFormError: i++
    },
    user: {
        login: i++,
        logout: i++
    },
    story: {
        addCard: i++,
        fetchCards: i++
    },
    submitUser: {
        setUserAdd: i++,
        setprojectAdd: i++
    }
};
