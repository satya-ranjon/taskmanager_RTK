import React from "react";
import { useGetTeamsQuery } from "../features/teams/teamsApi";

const TeamMembers = () => {
  const {
    data: teamMembers,
    isError,
    isLoading,
    isSuccess,
  } = useGetTeamsQuery();

  // decided what to render
  let content;
  if (isLoading) {
    content = <h4>Loading ......</h4>;
  }
  if (!isLoading && isError) {
    content = <h4>Some error occurred !</h4>;
  }
  if (!isLoading && !isError && isSuccess && teamMembers?.length === 0) {
    content = <h4>Team Members Not Found .!</h4>;
  }
  if (!isLoading && !isError && isSuccess && teamMembers?.length > 0) {
    content = teamMembers.map((teamMember) => (
      <div className="checkbox-container " key={teamMember.id}>
        <img src={teamMember.avatar} className="team-avater" />
        <p className="label">{teamMember.name}</p>
      </div>
    ));
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default TeamMembers;
