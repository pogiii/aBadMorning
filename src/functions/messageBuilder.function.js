export default function messageBuilder(match, teamId) {

    const scores = match.score.fulltime;

    const teams = {
        home: {
            name: match.teams.home.name,
            id: match.teams.home.id
        },
        away: {
            name: match.teams.away.name,
            id: match.teams.away.id
        }
    };

    let favTeamName = teams.home.name;
    let otherTeamName = teams.away.name;
    let scoreString = undefined

    if (teamId == teams.away.id) {
        favTeamName = teams.away.name;
        otherTeamName = teams.home.name;
    }

    if (scores.home > scores.away) {
        scoreString = `${scores.home} - ${scores.away}`;
    } else {
        scoreString = `${scores.away} - ${scores.home}`;
    }

    const matchDate = match.fixture.date.split('T')[0];

    const message = `בוקר טוב! \nרק רציתי להזכיר לך \nשהקבוצה שאתה אוהב ${favTeamName} \nהפסידה ל-${otherTeamName} \nהתוצאה הייתה: ${scoreString} \nבתאריך: ${matchDate}`
    return message;

}