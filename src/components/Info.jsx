import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { filterByCode } from '../config';

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  heigth: 100%;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  margin-bottom: 1rem;
  font-weigth: var(--fw-normal);
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

export const Info = ({
  name,
  nativeName,
  flag,
  capital,
  population,
  region,
  subregion,
  topLevelDomain,
  currencies = [],
  languages = [],
  borders = [],
  navigate,
}) => {
  const [neighbors, setNeighbors] = useState([]);
  useEffect(() => {
    if (borders.length) {
      axios
        .get(filterByCode(borders))
        .then(({ data }) => setNeighbors(data.map((country) => country.name)));
    }
  }, [borders]);

  console.log(
    languages
      .map((language) => language.name)
      .join(', ')
      .split(' ')
  );

  return (
    <Wrapper>
      <InfoImage src={flag} alt={name} />

      <div>
        <InfoTitle>{name}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Name:</b> {nativeName}
            </ListItem>

            <ListItem>
              <b>Population:</b> {population}
            </ListItem>
            <ListItem>
              <b>Region:</b> {region}
            </ListItem>
            <ListItem>
              <b>Subregion:</b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domain:</b>{' '}
              {topLevelDomain.length < 2
                ? topLevelDomain.map((domain) => (
                    <span key={domain}>{domain}</span>
                  ))
                : topLevelDomain
                    .join(', ')
                    .split('')
                    .map((domain, index) => <span key={index}>{domain}</span>)}
            </ListItem>
            <ListItem>
              <b>Currency:</b>{' '}
              {currencies.length < 2
                ? currencies.map((currency) => (
                    <span key={currency.code}>{currency.name}</span>
                  ))
                : currencies
                    .join(', ')
                    .split('')
                    .map((currency) => (
                      <span key={currency.code}>{currency.name}</span>
                    ))}
            </ListItem>
            <ListItem>
              <b>Languages:</b>{' '}
              {languages.length < 2
                ? languages.map((language) => (
                    <span key={language.name}>{language.name}</span>
                  ))
                : languages
                    .map((language) => language.name)
                    .join(', ')
                    .split('')
                    .map((language, index) => (
                      <span key={index}>{language}</span>
                    ))}
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries</b>
          {!borders.length ? (
            <span>There are no countries that border this country</span>
          ) : (
            <TagGroup>
              {neighbors.map((b) => (
                <Tag key={b} onClick={() => navigate(`/country/${b}`)}>
                  {b}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};