import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import operationService from "../../api/operationService";
import Toastify from "../../utility/Toastify";
import moment from "moment";

const Compensation = () => {
  // create discount state and set it when page loads from operationService getDiscount function
  const [discount, setDiscount] = useState<any>({});

  // state for filter discount data by year and month
  const [filter, setFilter] = useState<any>({
    year: moment().format("YYYY"),
    month: moment().format("M"),
  });

  // input change for filter
  const handleChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const getDiscount = async () => {
    try {
      const res = await operationService.getDiscount(filter.month, filter.year);
      setDiscount(res.data);
      console.log(res);
    } catch (error) {
      Toastify.success("Xəta baş verdi", "top-end");
    }
  };

  useEffect(() => {
    getDiscount();
  }, []);

  console.log(filter);

  return (
    <div>
      <div className="d-flex justify-content-center w-100 my-4">
        <div className="d-flex h-75">
          <input
            type="number"
            max="2023"
            name="year"
            onChange={handleChange}
            defaultValue={filter.year}
            className="form-control w-25 me-2 text-rigth"
          />
          <select
            defaultValue={filter.month}
            onChange={handleChange}
            name="month"
            className="form-control h-75 w-25 mx-2"
          >
            <option value="1">Yanvar</option>
            <option value="2">Fevral</option>
            <option value="3">Mart</option>
            <option value="4">Aprel</option>
            <option value="5">May</option>
            <option value="6">İyun</option>
            <option value="7">İyul</option>
            <option value="8">Avqust</option>
            <option value="9">Sentyabr</option>
            <option value="10">Oktyabr</option>
            <option value="11">Noyabr</option>
            <option value="12">Dekabr</option>
          </select>
          <Button onClick={() => getDiscount()} variant="primary">
            Göstər
          </Button>
        </div>
      </div>
      <div className="table-wrapper">
        {
          // if discount is empty show this
          !discount?.id ? (
            <div className="d-flex justify-content-center align-items-center">
              <h2 className="text-center">Məlumat tapılmadı</h2>
            </div>
          ) : (
            <ul className="p-0">
              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  DSMF (%)
                </p>
                <input
                  type="number"
                  value={discount?.dsmf}
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Gəlir vergisi (%)
                </p>
                <input
                  value={discount?.taxPercentage}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Tibbi Sığorta (%)
                </p>
                <input
                  type="number"
                  value={discount.healthInjurance}
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Ərzaq əvəzi kompen-si (AZN)
                </p>
                <input
                  type="number"
                  value={discount.food}
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Hesablanmış Məbləğ (AZN)
                </p>
                <input type="number" className="form-control w-25 h-50" />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Minimal əmək haqqı (AZN)
                </p>
                <input
                  value={discount.minWage}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Müharibə veteranı müavinatı (AZN)
                </p>
                <input
                  value={discount.veteran}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Müharibə vet. vergidən azad (AZN)
                </p>
                <input
                  value={discount.veteranTaxDiscount}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Çernobıl (AZN)
                </p>
                <input
                  value={discount.chernobil}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Qaçqın (AZN)
                </p>
                <input
                  value={discount?.qachqin}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Şəhid (AZN)
                </p>
                <input
                  value={discount.martyr}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Himayədar (AZN)
                </p>
                <input
                  value={discount.owner}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  1 və 2 qrup əlil (AZN)
                </p>
                <input
                  value={discount.disability}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>

              <li className="d-flex my-2">
                <p className="text-end mx-3 min-width-50 text-nowrap">
                  Səhra pulu (AZN)
                </p>
                <input
                  value={discount.desert}
                  type="number"
                  className="form-control w-25 h-50"
                />
              </li>
            </ul>
          )
        }
      </div>
    </div>
  );
};

export default Compensation;
