function getConfig(){

    if ( process.env.NODE_ENV === 'development' ) {

        return { url: 'http://localhost:5001/next-to-jump' }
    }
    else if ( process.env.NODE_ENV === 'production' ) {

        return { url: 'https://s3-ap-southeast-2.amazonaws.com/bet-easy-code-challenge/next-to-jump' }
    }
};

export {

	getConfig
};