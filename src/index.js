import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Search } from "./conponents/Search";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <div className="item">
          <img className="image" src={url} alt="" />
        </div>
      );
    });
    return <ul className="list">{imageList}</ul>;
  }
  render() {
    return (
      <div>
        <Search search={this.giphyApi} />
        {this.renderImageList(this.state.gifUrlList)}
      </div>
    );
  }
// 用axios to fetch the data. It priduces more cleaner code than using promise

//Put data into the state, then use state.map(<ul></ul>)
  giphyApi = target => {
    const search = target;
    const key = "wiopv1QEmVomgnaELq1YRjomVtm0Gana";
    const limit = 50;

    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);

      this.setState({ 
        gifUrlList: imageUrlList 
      });
    });
  };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
