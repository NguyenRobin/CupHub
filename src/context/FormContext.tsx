import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { divideTeamsByGroup, validateApprovedGroups } from "../utils";

type TKey = "rounds" | "won" | "draw" | "loss" | "teamsPerGroupAdvancing";

type Team = {
  id: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  points: number;
};

type TGroupPreview = {
  group: string;
  teams: Team[];
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
  name: "",
  description: "",
  sport: "",
  startDate: "",
  endDate: "",
  image: "",
  rounds: 1,
  won: 3,
  draw: 1,
  loss: 0,
  total_groups: 1,
  teamsPerGroupAdvancing: 1,
  validTotalGroupsBasedOnTotalTeams: 1,
  teams: [
    {
      id: 1,
      name: "Lag 1",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goals_for: 0,
      goals_against: 0,
      points: 0,
    },
    {
      id: 2,
      name: "Lag 2",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goals_for: 0,
      goals_against: 0,
      points: 0,
    },
  ],
  exampleGroupPreview: [
    {
      group: "A",
      teams: [
        {
          id: 1,
          name: "Lag 1",
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goals_for: 0,
          goals_against: 0,
          points: 0,
        },
        {
          id: 2,
          name: "Lag 2",
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goals_for: 0,
          goals_against: 0,
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
    name: "",
    description: "",
    sport: "",
    startDate: "",
    endDate: "",
    image: "",
    rounds: 1,
    won: 3,
    draw: 1,
    loss: 0,
    total_groups: 1,
    teamsPerGroupAdvancing: 1,
    validTotalGroupsBasedOnTotalTeams: 1,
    teams: [
      {
        id: 1,
        name: "Lag 1",
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goals_for: 0,
        goals_against: 0,
        points: 0,
      },
      {
        id: 2,
        name: "Lag 2",
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goals_for: 0,
        goals_against: 0,
        points: 0,
      },
    ],
    exampleGroupPreview: [
      {
        group: "A",
        teams: [
          {
            id: 1,
            name: "Lag 1",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goals_for: 0,
            goals_against: 0,
            points: 0,
          },
          {
            id: 2,
            name: "Lag 2",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goals_for: 0,
            goals_against: 0,
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
          id: id,
          name: `Lag ${id}`,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goals_for: 0,
          goals_against: 0,
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
          team.id === id ? { ...team, name: value } : team
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
