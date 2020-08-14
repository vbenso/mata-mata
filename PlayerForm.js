import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChessWebAPI from 'chess-web-api';
function PlayerForm() {
  const [userTwitch, setUserTwitch] = React.useState("");
  const [userChess, setUserChess] = React.useState("");
  const [profileReady, setProfileReady] = React.useState(false);
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

  const fieldChanged = event => {
    if (event.target["id"] === "username-twitch") {
      setUserTwitch(event.target.value);
    } else {
      setProfileReady(false);
      setUserChessProfile(null);
      setUserChess(event.target.value);
    }
    console.log(event);
  };
  const handleFetchClick = () => {
    debugger;
    var chessAPI = new ChessWebAPI();
    chessAPI.getPlayer(userChess)
    .then( (response) => {
      //console.log(response.body);

      setUserChessProfile(response.body);
      setProfileReady(true);
      
      debugger;
    }, (err)=> {
      console.log(err);
      setUserChessProfile(null);
    })

  }
  const handleAddClick = () => {
    alert("clicked");
    console.log({
      twitch: userTwitch,
      chess: userChess
    });
    //this.props.handleSubmit(userTwitch, userChess);
  };
  const renderProfile = () => {
    const dummyChessProfile = {
      avatar:'capivara.svg',
      title: 'CM',
      name: 'Capybara',
      username: ''
    }
    
    const profile = profileReady?userChessProfile:dummyChessProfile;
    return (
    <>
      <div style={{textAlign:"center", margin:'10px'}}>
        <img src={profile['avatar']} />
      </div>
      <div style={{textAlign:"center"}}>
        {profile['title']?profile['title']+' ':''  + profile['name']}
      </div>
    </>
    )
    
  };
  return (
    <Paper>
      <h2>PlayerForm</h2>
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
                style={{ width: "200px" }}
                id="username-chess"
                label="Usuário Chess.com"
                value={userChess}
                onChange={fieldChanged}
              />
              {!profileReady?
              <CheckCircleOutlineIcon onClick={handleFetchClick}/>
              :null}
            </div>
          </div>
          <Paper style={{ display:"flex", flexDirection:"column", justifyContent: "center" }}>
            {renderProfile()}
          </Paper>

          <Button variant="outlined" id="submit-form" onClick={handleAddClick}>
            Adicionar
          </Button>
        </div>
      </form>
    </Paper>
  );
}
export default PlayerForm;
