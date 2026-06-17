import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { theme } from '../../../styles/theme';

export const Container = styled.aside`
  width: 260px;
  height: 100vh;
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 16px;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    padding: 10px 12px;
    gap: 10px;
    background: ${theme.colors.primary};
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 1px 0 rgba(15, 23, 42, 0.06);
  }

  @media (max-width: 420px) {
    padding: 8px;
  }
`;

export const Top = styled.div`
  @media (max-width: 768px) {
    display: grid;
    gap: 8px;
  }
`;

export const Logo = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    color: #ffffff;
    margin-bottom: 0;
    font-size: 1.05rem;
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  background: #f3f4f6;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 20px;

  input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    font-family: inherit;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
    background: rgba(255, 255, 255, 0.14);
    color: #ffffff;

    input {
      color: #ffffff;
    }

    input::placeholder {
      color: rgba(255, 255, 255, 0.72);
    }
  }

  @media (max-width: 420px) {
    min-height: 34px;
    padding: 6px 8px;

    input {
      font-size: 0.9rem;
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: thin;
  }
`;

export const Bottom = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  background: transparent;
  color: ${theme.colors.text};

  span {
    white-space: nowrap;
  }

  &:hover {
    background: #f3f4f6;
  }

  &.active {
    background: #e8f0fe;
    color: ${theme.colors.primary};
  }

  @media (max-width: 768px) {
    flex-shrink: 0;
    min-height: 36px;
    padding: 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &.active {
      border-color: rgba(255, 255, 255, 0.75);
      background: #ffffff;
      color: ${theme.colors.primary};
    }
  }

  @media (max-width: 420px) {
    gap: 6px;
    padding: 7px 10px;
    font-size: 0.84rem;
  }
`;

export const SearchWrap = styled.div`
  position: relative;
`;

export const SearchResults = styled.div`
  position: absolute;
  z-index: 40;
  top: calc(100% - 14px);
  left: 0;
  right: 0;
  display: grid;
  gap: 4px;
  padding: 7px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.16);

  small {
    padding: 9px;
    color: ${theme.colors.muted};
  }

  @media (max-width: 768px) {
    top: calc(100% + 5px);
  }
`;

export const SearchResult = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 10px;
  border-radius: 8px;
  background: transparent;
  color: ${theme.colors.text};
  text-align: left;
  font-family: inherit;

  &:hover,
  &:focus-visible {
    background: #eef4ff;
    color: ${theme.colors.primary};
    outline: none;
  }
`;
