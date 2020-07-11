
const main = async () => {
    console.log("Yeah!");
    await waiting();
    console.log("Done!");
};

const waiting = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("waiting...");
            resolve();
        }, 3000);
    });
};

main();