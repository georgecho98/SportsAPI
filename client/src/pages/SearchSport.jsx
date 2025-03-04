import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
// import { gql, useMutation } from '@apollo/client';
import type { FormEvent } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveTeam, searchSport } from '../utils/API';
import { saveTeamIds, getSavedTeamIds } from '../utils/localStorage';
import { Team} from '../models/Team';
import { SAVE_TEAM } from '../utils/mutation';

const SearchSport = () => {
  // create state for holding returnedapi data
  const [searchedTeams, setSearchedTeams]= useState<Team>([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedTeamIds, setSavedTeamIds] = useState(getSavedTeamIds());
  const [saveTeam, {error}]= useMutation(SAVE_TEAM);
  

  useEffect(() => {
    return () => saveTeamIds(savedTeamIds);
  }, [savedTeamIds]);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchSport(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const teamData = items.map((team) => ({
        teamId: team.id,
        
        authors: team.volumeInfo.authors || ['No author to display'],
        title: team.volumeInfo.title,
        description: team.volumeInfo.description,
        image: team.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedTeams(teamData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  
  // create function to handle saving a book to our database
  const handleSaveTeam = async (teamId) => {
    
    // find the book in `saveTeam` state by the matching id
    const teamToSave = searchedTeams.find((team) => team.teamId === teamId)!;
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await saveBook(teamToSave, token);
      const {data} = await saveTeam({
        variables:{
          teamInput:{
            teamId: teamToSave.teamId,
            authors:teamToSave.authors,
            description:teamToSave.description,
            title:teamToSave.title,
            imageLinks:teamToSave.imageLinks,
                    
          }
       }

      })

      if (data && data.saveTeam) {
        setSavedTeamIds([...savedTeamIds, teamToSave.teamId]);
      
      } else {
        throw new Error('something went wrong!');
      }
      // if book successfully saves to user's account, save book id to state
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Team!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a team'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {saveTeam.length
            ? `Viewing ${saveTeam.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {saveTeam.map((team) => {
            return (
              <Col md="4" key={team.teamId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={team.image} alt={`The cover for ${team.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{team.title}</Card.Title>
                    <p className='small'>Authors: {team.authors}</p>
                    <Card.Text>{team.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedTeamIds?.some((savedTeamId) => savedTeamId === team.teamId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveTeam(team.teamId)}>
                        {savedTeamIds?.some((savedTeamId) => savedTeamId === team.teamId)
                          ? 'This team has already been saved!'
                          : 'Save this team!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchSport;

