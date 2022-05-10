const express = require("express");
const upload = require("../middleware/multer");

const {
  controllerAddCompany,
  controllerUpdateCompany,
  controllerDeleteCompany,
  controllerGetCompanies,
  controllerFetchCompany,
} = require("./company.Controller");

const router = express.Router();

router.param("companyId", async (req, res, next, companyId) => {
  console.log("companyId", companyId);
  const company = await controllerFetchCompany(companyId, next);
  if (company) {
    req.company = company;
    next();
  } else {
    const err = new Error("company Not Found");
    err.status = 404;
    next(error);
  }
});

// router.param("companiesId", async (req, res, next, companiesId) => {
//   console.log("companiesId", companiesId);
//   const companies = await controllerGetCompanies(companiesId, next);
//   if (companies) {
//     req.companies = companies;
//     next();
//   } else {
//     const err = new Error("companies Not Found");
//     err.status = 404;
//     next(err);
//   }
// });

router.post("/", controllerAddCompany);

router.get("/", controllerGetCompanies);
router.get("/:companyId", controllerFetchCompany);

router.post("/", upload.single("image"), controllerAddCompany);

router.put("/:companyId", controllerUpdateCompany);

router.delete("/:companyId", controllerDeleteCompany);

module.exports = router;
