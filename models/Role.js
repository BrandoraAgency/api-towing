module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["admin", "accountant", "qc", "dispatch", "sales"],
      },
      passto: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["admin", "accountant", "qc", "dispatch"],
      },
      access: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  const TowingCompany = sequelize.define(
    "towingCompany",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pickUp: {
        type: DataTypes.STRING,
      },
      dropoff: {
        type: DataTypes.STRING,
      },
      Agent: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING(100),
      },
      phone: {
        type: DataTypes.STRING(50),
      },
      zipCode: {
        type: DataTypes.STRING,
      },
      charged: {
        type: DataTypes.INTEGER,
      },
      paymentStatus: {
        type: DataTypes.STRING,
      },
      chargedDate: {
        type: DataTypes.DATE,
      },
      chargedTime: {
        type: DataTypes.TIME,
      },
      Notes: {
        type: DataTypes.TEXT("long"),
      },
    },
    {
      timestamps: false,
    }
  );
  const Job = sequelize.define(
    "job",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      towing_id: {
        type: DataTypes.INTEGER,
        references: {
          model: TowingCompany,
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATE,
      },
      time: {
        type: DataTypes.TIME,
      },
      agent: {
        type: DataTypes.STRING,
      },
      representative: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      providerID: {
        type: DataTypes.STRING,
      },
      issuranceAccount: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      issChargedDate: {
        type: DataTypes.DATE,
      },
      issChargedTime: {
        type: DataTypes.TIME,
      },
      charged_status: {
        type: DataTypes.STRING,
      },
      jobStatus: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.STRING,
      },
      model: {
        type: DataTypes.STRING,
      },
      make: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
      vinNO: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      miles: {
        type: DataTypes.STRING,
      },
      upSellAmount: {
        type: DataTypes.INTEGER,
      },
      upSellCharged: {
        type: DataTypes.STRING,
      },
      notes: {
        type: DataTypes.TEXT("long"),
      },
      assignto: {
        type: DataTypes.STRING,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
  Job.belongsTo(TowingCompany, { foreignKey: "towing_id" });
  const TowImage = sequelize.define(
    "towImage",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      src: {
        type: DataTypes.STRING,
      },
      jobId: {
        type: DataTypes.INTEGER,
        references: {
          model: "jobs",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
  Job.hasMany(TowImage, { foreignKey: "jobId" });
  const TowReceipt = sequelize.define(
    "towReceipt",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      src: {
        type: DataTypes.STRING,
      },
      jobId: {
        type: DataTypes.INTEGER,
        references: {
          model: "jobs",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
  Job.hasMany(TowReceipt, { foreignKey: "jobId" });
  const JobLog = sequelize.define(
    "jobLogs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      actions: {
        type: DataTypes.STRING,
      },
      jobId: {
        type: DataTypes.INTEGER,
        references: {
          model: "jobs",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATE,
      },
      user: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  Job.hasMany(JobLog, { foreignKey: "jobId" });
  const LogChange = sequelize.define(
    "logChange",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      changes: {
        type: DataTypes.STRING,
      },
      logId: {
        type: DataTypes.INTEGER,
        references: {
          model: JobLog,
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
  JobLog.hasMany(LogChange, { foreignKey: "logId" });
  return {
    User,
    TowingCompany,
    Job,
    TowImage,
    TowReceipt,
    JobLog,
    LogChange,
  };
};
