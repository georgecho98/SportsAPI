import { useState, useEffect, SetStateAction } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { saveTeam, deleteTeam } from '../utils/API';
import Auth from '../utils/auth';
import { removeTeamId } from '../utils/localStorage';
import { User } from '../models/User';
import { GET_ME } from '../utils/queries'; 
import {useQuery, useMutation} from  '@apollo/client';


import { REMOVE_TEAM} from '../utils/mutations';

const ScoreResult = () => {

  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedTeams: [],
  });

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  
    // Fetch user data using useQuery
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'network-only',
  });
  
  useEffect(() => {
    if (data) {
        setUserData(data.user); // Assuming 'user' is the correct field in your query response
      }
  }, [data]);
  
    if (loading) return <h2>LOADING...</h2>;
    if (error) return <h2>Error: {error.message}</h2>;


  const{deleteTeam} = useMutation(REMOVE_TEAM, {
    onCompleted: 
    (data) => 
      {
      // Assuming the mutation returns the updated user data
      setUserData(data.removeTeam); // Adjust based on your mutation response
    },
    onError: (error) => {
      console.error("Error deleting Team:", error);
    }
  });

  
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteTeam= async (teamId) => {
    
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await deleteBook(bookId, token);
      await deleteTeam({variables:{teamId}})

      removeTeamId(teamId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved teams!</h1>
          ) : (
            <h1>Viewing saved teams!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedTeams.length
            ? `Viewing ${userData.savedTeams.length} saved ${
                userData.savedTeams.length === 1 ? 'team' : 'teams'
              }:`
            : 'You have no saved teams!'}
        </h2>
        <Row>
          {userData.savedTeams.map((team) => {
            return (
              <Col md='4'>
                <Card key={team.teamId} border='dark'>
                  {team.image ? (
                    <Card.Img
                      src={team.image}
                      alt={`The cover for ${team.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{team.title}</Card.Title>
                    <p className='small'>Authors: {team.authors}</p>
                    <Card.Text>{team.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteTeam(team.teamId)}
                    >
                      Delete this Book!
                    </Button>
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

export default ScoreResult;
