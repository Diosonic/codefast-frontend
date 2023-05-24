export default class SeedSerializer {
    fromJson(json) {
      debugger;
      const round = {};
  
      Object.assign(
        round,
        json.id && {
          id: json.id,
          value: json.id,
          label: json.id,
        },
        json.round_id && {
          round_id: json.round_id
        },
        json.teams && {
          teams: json.teams
        },
        json.date_match && {
          date_match: json.date_match
        }
   
      );
  
      return round;
    }
  
    toJson(round) {
      debugger;
      const roundToJson = {};
  
      Object.assign(
        roundToJson,
        round.round_id && {round_id: round.round_id},
   
      );
      return roundToJson;
    }
  }
  