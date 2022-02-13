const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
        get() {
          return this.getDataValue("duration") + " days";
        },
      },
      season: {
        type: DataTypes.ENUM([
          "Summer",
          "Winter",
          "Spring",
          "Autumn",
          "No Season",
        ]),
        allowNull: true,
        set(value) {
          if (value === "") this.setDataValue("season", "No Season");
          else this.setDataValue("season", value);
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
