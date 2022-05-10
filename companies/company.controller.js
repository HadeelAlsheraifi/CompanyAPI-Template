const Company = require("../models/Company");

exports.controllerGetCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();

    res.json({ msg: "Companies fetched", payload: companies });
  } catch (error) {
    next(error);
  }
};

exports.controllerFetchCompany = async (companyId, next) => {
  try {
    const company = await Company.findById(companyId);

    if (company) return company;
    else {
      const error = new Error("Company ID was not found!");

      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
// exports.createAddCompany = async (req, res, next) => {
//     try {
//       if (req.file) {
//         req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//       }
//       let company = req.body;
//       company.id = data[data.lenght - 1].id + 1;
//       company.phone = +company.phone;
//       data.push(company);
//       res.status(201).json(company);
//     } catch (error) {
//       next(error);
//     }
//   };

exports.controllerAddCompany = async (req, res, next) => {
  try {
    const company = req.body;
    const createdCompany = await Company.create(company);
    res.status(200).json({ msg: "company Created", payload: createdCompany });
  } catch (error) {
    next(error);
  }
};

exports.controllerUpdateCompany = async (req, res, next) => {
  try {
    const id = req.company._id;
    const companyBody = req.body;
    const updatedCompany = await Company.findByIdAndUpdate(id, companyBody, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      msg: "company Updated",
      payload: updatedCompany,
    });
  } catch (error) {
    next(error);
  }
};

exports.controllerDeleteCompany = async (req, res, next) => {
  try {
    await req.company.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
