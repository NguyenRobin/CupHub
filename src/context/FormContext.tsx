import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { divideTeamsByGroup, validateApprovedGroups } from '../utils';

type TKey = 'rounds' | 'won' | 'draw' | 'loss' | 'teamsPerGroupAdvancing';

type Team = {
  team_id: number | string;
  team: string;
  won: number;
  draw: number;
  loss: number;
  goals_scored: number;
  goals_conceded: number;
  goal_difference: number;
  matches_played: number;
  points: number;
};

type TGroupPreview = {
  group: string;
  standings: Team[];
};

type TFormContext = {
  name: string;
  description: string;
  sport?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  rounds: number;
  won: number;
  draw: number;
  loss: number;
  total_groups?: number;
  teamsPerGroupAdvancing?: number;
  validTotalGroupsBasedOnTotalTeams: number;
  teams: Team[];
  exampleGroupPreview: TGroupPreview[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectAmountOfGroups: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeTotalTeams: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeTeamName: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: any
  ) => void;
  handleOnSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleIncrement: (key: TKey) => void;
  handleDecrement: (key: TKey) => void;
};

type TChildrenProps = {
  children: React.ReactNode;
};

const defaultState: TFormContext = {
  name: '',
  description: '',
  sport: '',
  startDate: '',
  endDate: '',
  image: '',
  rounds: 1,
  won: 3,
  draw: 1,
  loss: 0,
  total_groups: 1,
  teamsPerGroupAdvancing: 1,
  validTotalGroupsBasedOnTotalTeams: 1,
  teams: [
    {
      team_id: 1,
      team: 'Lag 1',
      won: 0,
      draw: 0,
      loss: 0,
      goals_scored: 0,
      goals_conceded: 0,
      goal_difference: 0,
      matches_played: 0,
      points: 0,
    },
    {
      team_id: 2,
      team: 'Lag 2',
      won: 0,
      draw: 0,
      loss: 0,
      goals_scored: 0,
      goals_conceded: 0,
      goal_difference: 0,
      matches_played: 0,
      points: 0,
    },
  ],
  exampleGroupPreview: [
    {
      group: 'A',
      standings: [
        {
          team_id: 1,
          team: 'Lag 1',
          won: 0,
          draw: 0,
          loss: 0,
          goals_scored: 0,
          goals_conceded: 0,
          goal_difference: 0,
          matches_played: 0,
          points: 0,
        },
        {
          team_id: 2,
          team: 'Lag 2',
          won: 0,
          draw: 0,
          loss: 0,
          goals_scored: 0,
          goals_conceded: 0,
          goal_difference: 0,
          matches_played: 0,
          points: 0,
        },
      ],
    },
  ],
  page: 0,
  setPage: () => {},
  handleOnChange: () => {},
  handleSelectAmountOfGroups: () => {},
  handleChangeTotalTeams: () => {},
  handleChangeTeamName: () => {},
  handleOnSelect: () => {},
  handleIncrement: () => {},
  handleDecrement: () => {},
};

export const FormContext = createContext<TFormContext>(defaultState);

export function FormProvider({ children }: TChildrenProps) {
  const [page, setPage] = useState(0);

  const [data, setData] = useState({
    name: '',
    description: '',
    sport: '',
    startDate: '',
    endDate: '',
    image: '',
    rounds: 1,
    won: 3,
    draw: 1,
    loss: 0,
    total_groups: 1,
    teamsPerGroupAdvancing: 1,
    validTotalGroupsBasedOnTotalTeams: 1,
    teams: [
      {
        team_id: 1,
        team: 'Lag 1',
        won: 0,
        draw: 0,
        loss: 0,
        goals_scored: 0,
        goals_conceded: 0,
        goal_difference: 0,
        matches_played: 0,
        points: 0,
      },
      {
        team_id: 2,
        team: 'Lag 2',
        won: 0,
        draw: 0,
        loss: 0,
        goals_scored: 0,
        goals_conceded: 0,
        goal_difference: 0,
        matches_played: 0,
        points: 0,
      },
    ],
    exampleGroupPreview: [
      {
        group: 'A',
        standings: [
          {
            team_id: 1,
            team: 'Lag 1',
            won: 0,
            draw: 0,
            loss: 0,
            goals_scored: 0,
            goals_conceded: 0,
            goal_difference: 0,
            matches_played: 0,
            points: 0,
          },
          {
            team_id: 2,
            team: 'Lag 2',
            won: 0,
            draw: 0,
            loss: 0,
            goals_scored: 0,
            goals_conceded: 0,
            goal_difference: 0,
            matches_played: 0,
            points: 0,
          },
        ],
      },
    ],
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleOnSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;

    setData((prevState) => ({ ...prevState, [name]: +value }));
  }

  function handleIncrement(key: TKey) {
    if (data[key] === 9) return;

    setData((prev) => {
      return {
        ...prev,
        [key]: prev[key] + 1,
      };
    });
  }

  function handleDecrement(key: TKey) {
    if (data[key] === 0) return;

    setData((prev) => {
      return {
        ...prev,
        [key]: prev[key] - 1,
      };
    });
  }

  function handleSelectAmountOfGroups(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = +e.target.value;
    const groups = divideTeamsByGroup(data.teams.length, value, data.teams);

    setData((prev) => {
      return { ...prev, total_groups: value, exampleGroupPreview: groups };
    });
  }

  function handleChangeTotalTeams(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const value = +e.target.value;
    const difference = value - data.teams.length;
    const totalTeams = difference + data.teams.length;

    if (value > data.teams.length) {
      Array.from(Array(difference).keys()).forEach((team) => {
        const id = data.teams.length + (team + 1);

        const newTeam = {
          team_id: id,
          team: `Lag ${id}`,
          won: 0,
          draw: 0,
          loss: 0,
          goals_scored: 0,
          goals_conceded: 0,
          goal_difference: 0,
          matches_played: 0,
          points: 0,
        };

        setData((prev) => {
          return { ...prev, teams: [...prev.teams, newTeam] };
        });
      });
    } else if (value < data.teams.length && value >= 2) {
      setData((prev) => {
        return { ...prev, teams: prev.teams.slice(0, value) };
      });
    }

    const validAmountOfGroups = validateApprovedGroups(totalTeams);
    const groups = divideTeamsByGroup(
      data.teams.length,
      data.total_groups,
      data.teams
    );

    setData((prev) => {
      return {
        ...prev,
        validTotalGroupsBasedOnTotalTeams: validAmountOfGroups,
        total_groups:
          validAmountOfGroups < data.total_groups
            ? validAmountOfGroups
            : data.total_groups,
        exampleGroupPreview: groups,
      };
    });
  }

  function handleChangeTeamName(
    e: React.ChangeEvent<HTMLInputElement>,
    id: any
  ) {
    const { value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        teams: prev.teams.map((team) =>
          team.team_id === id ? { ...team, name: value } : team
        ),
      };
    });
  }

  useEffect(() => {
    if (data.total_groups !== null) {
      const groups = divideTeamsByGroup(
        data.teams.length,
        data.total_groups,
        data.teams
      );
      setData((prev) => {
        return { ...prev, exampleGroupPreview: groups };
      });
    }
  }, [data.teams.length, data.total_groups, data.teams]);

  return (
    <FormContext.Provider
      value={{
        ...data,
        page,
        setPage,
        handleOnChange,
        handleSelectAmountOfGroups,
        handleChangeTotalTeams,
        handleChangeTeamName,
        handleOnSelect,
        handleIncrement,
        handleDecrement,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
