class helper {
    static sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
}

export default helper
