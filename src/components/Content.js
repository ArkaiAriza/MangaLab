import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Grid, Image } from 'semantic-ui-react';

import { Card } from './common/';

import MangaCard from './MangaCard';

const StyledContainer = styled.div`
  display: block;
  flex-flow: row wrap;
  justify-content: center;
  padding: 60px;
  width: 100%;
`;

class Content extends React.Component {
  state = { mangaList: [], im: '', page: 0, nItems: 23 };

  async componentDidMount() {
    const res = await axios.post(
      //url: 'https://www.mangaeden.com/api/list/0/?p=0&l=32'
      'http://localhost:5000/filter',
      { page: this.state.page, nItems: this.state.nItems }
    );
    //console.log(res);
    this.setState({ mangaList: res.data });
  }

  renderList() {
    if (!this.state.mangaList) {
      return <h1>Loading</h1>;
    }
    return this.state.mangaList.map(manga => {
      return <Card manga={manga} />;
    });
  }

  render() {
    //console.log(this.state);
    return <StyledContainer>{this.renderList()}</StyledContainer>;
  }
}

export default Content;
