import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChessWebAPI from 'chess-web-api';
function PlayerForm(props) {

  const [userTwitch, setUserTwitch] = React.useState("");
  const [userChess, setUserChess] = React.useState("");
  //profile from https://api.chess.com/pub/player/rubenscezila
  const [userChessProfile, setUserChessProfile] = React.useState(/*{
    avatar:
      "https://images.chesscomfiles.com/uploads/v1/user/68187854.6008a58e.200x200o.f6aeb9655650.png",
    player_id: 68187854,
    id: "https://api.chess.com/pub/player/rubenscezila",
    url: "https://www.chess.com/member/RubensCezila",
    name: "Rubens Cezila",
    username: "rubenscezila",
    title: "FM",
    followers: 439,
    country: "https://api.chess.com/pub/country/BR",
    location: "Washington, DC",
    last_online: 1597345298,
    joined: 1574172387,
    status: "premium",
    is_streamer: true,
    twitch_url: "https://twitch.tv/Chesszila"
  }*/null);
  const [userChessStats, setUserChessStats] = React.useState(null);

  const fieldChanged = event => {
    if (event.target["id"] === "username-twitch") {
      setUserTwitch(event.target.value);
    } else {
      setUserChessProfile(null);
      setUserChess(event.target.value);
    }
    console.log(event);
  };
  const handleFetchClick = () => {
    var chessAPI = new ChessWebAPI();
    chessAPI.getPlayer(userChess)
    .then( (response) => {
      setUserChessProfile(response.body);
      const options = {};
      chessAPI.getPlayerStats(userChess)
      .then((response)=>{
        setUserChessStats(response.body);
      }, (err)=> {
        console.log(err);
        setUserChessStats(null);
        alert('Error fetching stats');
      });
    }, (err)=> {
      console.log(err);
      alert('Error fetching profile');
      setUserChessProfile(null);
    })

  }
  
  const handleAddClick = () => {
    console.log({
      twitch: userTwitch,
      chess: userChess
    });
    let rating=1000;
    try {
      rating = userChessStats['chess_blitz']['last']['rating'];
    } 
    catch(err) {

    }
    
    props.onSubmit(userTwitch, userChess, rating, userChessProfile, userChessStats);
  };
  const renderProfile = () => {
    const dummyChessProfile = {
      avatar:'https://raw.githubusercontent.com/vbenso/mata-mata/dee26b13da88beec16dc2d93244197aa14568fd1/capivara.svg',
      title: 'CaPi',
      name: 'Capybara',
      username: '' 
    }
    const dummyChessStats = {
      chess_blitz: {
        best: {
          rating: 1000,
          date: 1546782667,
          game: "https://www.chess.com/live/game/3948939005"
        },
        last: {
          rating:1000,
          date:1546782667,
          rd:25
        },
        record: {
          win: 100,
          loss: 20,
          draw: 30,
        }
      }
    };
    
    const profile = userChessProfile?userChessProfile:dummyChessProfile;
    const stats = userChessStats? userChessStats:dummyChessStats;
    return (
    <>
      <div style={{textAlign:"center", margin:'10px'}}>
        <img src={profile['avatar']} />
      </div>
      <div style={{textAlign:"center"}}>
        {profile['title']?profile['title']+' '+profile['name']:profile['name']}
      </div>
      
      <div style={{textAlign:"center"}}>
        Rating:{stats['chess_blitz']['last']['rating']}
      </div>
    </>
    )
    
  };
  return (
    <Paper>
      <form noValidate autoComplete="off">
        <div style={{ display: "flex", flexDirection: "column", width:"220px" }}>
          <TextField
              id="username-twitch"
              label="Usuário Twitch"
              value={userTwitch}
              onChange={fieldChanged}
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems:"baseline" }}>
              <TextField
                id="username-chess"
                label="Usuário Chess.com"
                value={userChess}
                onChange={fieldChanged}
              />
              {!userChessProfile && userChess.length>3?
              <CheckCircleOutlineIcon onClick={handleFetchClick}/>
              :null}
            </div>
          </div>
          <Paper style={{ display:"flex", flexDirection:"column", justifyContent: "center" }}>
            {renderProfile()}
          </Paper>
          
          <Button variant="outlined" id="submit-form" onClick={handleAddClick} disabled={!(userChessStats&&userChessProfile && userTwitch.length>3)}>
            Adicionar
          </Button>
          
        </div>
      </form>
    </Paper>
  );
}
export default PlayerForm;
