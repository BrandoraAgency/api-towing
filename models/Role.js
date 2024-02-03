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
  const Company = sequelize.define(
    "company",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phone: {
        type: DataTypes.STRING(50),
      },
      pricing_range: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          min: 1,
          max: 5,
        },
      },
      winch_out_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      hookup_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      miles_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "company",
      timestamps: false,
    }
  );
  const Rating = sequelize.define(
    "rating",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        references: {
          model: Company,
          key: "id",
        },
      },
      rating: {
        type: DataTypes.STRING(50),
      },
      user: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "rating",
      timestamps: false,
    }
  );
  Company.hasMany(Rating, { foreignKey: "companyId" });
  Rating.belongsTo(Company, { foreignKey: "companyId" });
  const TowingCompany = sequelize.define(
    "towingCompany",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        references: {
          model: Company,
          key: "id",
        },
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
      zipCode: {
        type: DataTypes.STRING,
      },
      Email: {
        type: DataTypes.STRING,
      },
      address: {
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
      tableName: "towingCompany",
      timestamps: false,
    }
  );
  TowingCompany.belongsTo(Company, { foreignKey: "companyId" });
  Company.hasMany(TowingCompany, { foreignKey: "companyId" });
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
       Trade_Name: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      Email: {
        type: DataTypes.STRING,
      },
      providerID: {
        type: DataTypes.STRING,
      },
      issuranceAccount: {
        type: DataTypes.STRING,
      },
      poNo: {
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
      tableName: "jobs",
      timestamps: false,
    }
  );
  Job.belongsTo(TowingCompany, { foreignKey: "towing_id" });
  const DispatchTicket = sequelize.define('dispatchTicket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ticketNumber: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'id'
      }
    }
  }, {
    tableName: 'dispatchTicket',
    timestamps: false
  });
  DispatchTicket.belongsTo(Job, { foreignKey: 'jobId' });
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
      tableName: "towImage",
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
      tableName: "towReceipt",
      timestamps: false,
    }
  );
  Job.hasMany(TowReceipt, { foreignKey: "jobId" });
  const JobLog = sequelize.define(
    "jobLog",
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
      tableName: "jobLog",
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
      tableName: "logChange",
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
    Company,
    Rating,
    DispatchTicket,
  };
};
