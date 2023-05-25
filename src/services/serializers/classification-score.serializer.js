export default class ClassificationScoreSerializer {
  fromJson(json) {
    const classificationScore = {};

    Object.assign(
      classificationScore,
      json.id && {
        id: json.id,
      },
      {
        inProgress: json.in_progress,
      }
    );

    return classificationScore;
  }

  toJson(classificationScore) {
    const classificationScoreToJson = {};

    Object.assign(
      classificationScoreToJson,
      classificationScore.id && { id: classificationScore.id },
      {
        in_progress: classificationScore.inProgress,
      }
    );

    return classificationScoreToJson;
  }
}
