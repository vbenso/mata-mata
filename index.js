import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import PlayerForm from "./PlayerForm";
import "./style.css";
function MatchTable(props) {
  const colors = [
    'rgb(255,229,153)',
    'rgb(182,215,168)',
    'rgb(213,166,189)',
    'rgb(159,197,232)',
    'rgb(249,203,156)',
    'rgb(244,204,204)',
    'rgb(180,167,214)',
    'rgb(147,196,125)'
  ];
  const players = props.players;
  debugger;
  const renderHeader = () => {
    debugger;
    return (
      <thead>
        <tr>
          <th class="cabecalho" />
          <th class="cabecalho">Twitch</th>
          <th class="cabecalho">Chess.com</th>
          <th class="cabecalho">Rating</th>
          <th class="cabecalho">Group Final</th>
          <th class="cabecalho">Quartas</th>
          <th class="cabecalho">Semi</th>
          <th class="cabecalho">Final</th>
          <th class="cabecalho">Campeão</th>
        </tr>
      </thead>
    );
  };
  const renderRows = players => {
    debugger;
    return (
      <tbody>
        {players.map((player, idx) => {
          const color_idx = Math.floor(idx/4);
          const row_style = {
            background: colors[color_idx]
          }
          return (
            <tr>
              <td class="conteudo" style={{...row_style}}>{idx + 1}</td>
              <td class="conteudo" style={{...row_style}}>{player["twitch"]}</td>
              <td class="conteudo" style={{...row_style}}>{player["chess"]}</td>
              <td class="conteudo" style={{...row_style}}>{player["rating"]}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };
  debugger;
  return (
    <table>
      {renderHeader()}
      {renderRows(players)}
    </table>
  );
}
function App() {
  const dummy_data = [
    {
      twitch: "gaabroo92",
      chess: "BrazilianSwag",
      rating: 2506
    },
    {
      twitch: "wranho",
      chess: "WesleyRanho",
      rating: 2253
    },
    {
      twitch: "PatrickLittig",
      chess: "PatrickLittig",
      rating: 2156
    },
    {
      twitch: "ixandy",
      chess: "giovani_cwb",
      rating: 2050
    },
    {
      twitch: "antunesperoza",
      chess: "antunesperoza",
      rating: 2030
    },
    {
      twitch: "dlborger",
      chess: "davalb",
      rating: 1830
    },
    {
      twitch: "Matheus0Henrique",
      chess: "Matheus-Henrique",
      rating: 1778
    },
    {
      twitch: "ca1valoo",
      chess: "glebsonrafael",
      rating: 1680
    },
    {
      twitch: "inaciodavies",
      chess: "inaciodavies",
      rating: 1643
    },
    {
      twitch: "joaoftb0",
      chess: "JoaoFTB",
      rating: 1626
    },
    {
      twitch: "rod7lima",
      chess: "rod_lima",
      rating: 1550
    },
    {
      twitch: "metaleiro_dota2",
      chess: "diegolamarao",
      rating: 1533
    },
    {
      twitch: "jonastrindade82",
      chess: "jonastrindade",
      rating: 1506
    },
    {
      twitch: "Lavoisier_Oliveira",
      chess: "Lavoisier_Oliveira",
      rating: 1498
    },
    {
      twitch: "surfistapratiado22",
      chess: "surfistapratiado",
      rating: 1427
    },
    {
      twitch: "splector1227",
      chess: "gabriel122762",
      rating: 1423
    },
    {
      twitch: "andrefalca0",
      chess: "Andre_Falcao",
      rating: 1407
    },
    {
      twitch: "pedrop_sm",
      chess: "ChessPedroP",
      rating: 1385
    },
    {
      twitch: "elissama_camargo",
      chess: "ElissamaCamargo",
      rating: 1335
    },
    {
      twitch: "FritzMatador",
      chess: "Fritz-Brazuca",
      rating: 1310
    },
    {
      twitch: "sandymio1",
      chess: "SandyYolainny",
      rating: 1299
    },
    {
      twitch: "carlosalexandre2038",
      chess: "carlosalexandre_2038",
      rating: 1219
    },
    {
      twitch: "Uchichaz",
      chess: "Alex_V_Chess",
      rating: 1216
    },
    {
      twitch: "Isaaczin2008",
      chess: "isaaczin",
      rating: 1200
    },
    {
      twitch: "Miguelmds14",
      chess: "Zigaruu",
      rating: 1020
    },
    {
      twitch: "rafafeitosa123456789",
      chess: "rafaelpereira720",
      rating: 985
    },
    {
      twitch: "davibbp007",
      chess: "davibbp",
      rating: 940
    },
    {
      twitch: "RafaelCarreiro79",
      chess: "rafaelcarreiro79",
      rating: 910
    },
    {
      twitch: "jo40luc4s",
      chess: "JhonLucas",
      rating: 903
    },
    {
      twitch: "jordano_MY",
      chess: "JordanoFK",
      rating: 901
    },
    {
      twitch: "guiguivieiraf",
      chess: "guilherme0488",
      rating: 511
    },
    {
      twitch: "tiohdogomes",
      chess: "tioh404",
      rating: 265
    }
  ];
  const [players, setPlayers] = React.useState(dummy_data);
  const handleSubmit = (twitch, chess, rating, chessProfile, chessStats) => {
    debugger;
    let new_players = [...players];
    new_players.push({
      twitch: twitch,
      chess: chess,
      rating: rating,
      chessProfile: chessProfile,
      chessStats: chessStats
    });
    new_players = new_players
      .sort((a, b) => {
        debugger;
        if (a["rating"] > b["rating"]) {
          return 1;
        } else if (a["rating"] < b["rating"]) {
          return -1;
        }
        return 0;
      })
      .reverse();
    setPlayers(new_players);
  };
  return (
    <>
      <MatchTable players={players} />
      <PlayerForm onSubmit={handleSubmit} />
    </>
  );
}

render(<App />, document.getElementById("root"));
