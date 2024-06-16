export function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs} `;

    return formattedTime;
}

export function secondsForFarm(finisTime: number) {
    const currentSecondsTime = new Date().getTime() / 1000;
    const secondsFarm = (finisTime - currentSecondsTime);

    return Math.floor(secondsFarm);
}

export function claimedTotalCurrent(startFarmDate: number, ratePerHour: number) {
    // calculate how tokens farm user right now
    return Math.round((((new Date().getTime() / 1000 - startFarmDate)) * ratePerHour / 60 / 60))
}
