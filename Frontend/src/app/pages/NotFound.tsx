import React from "react";

const NotFound = () => {
  return (
    <div className="login-page">
      <div className="d-flex flex-column w-50 text-left">
        <h4 className="fs-1 fw-5">404 - Səhifə tapılmadı</h4>
        <p className="mb-5 text-left">
          Axtardığınız səhifənin adı dəyişdirilsə və ya müvəqqəti olaraq əlçatan
          olmasa silinmiş ola bilər.{" "}
        </p>
        <a href="/" className="btn w-25 btn-outline-success">
          Ana səhifəyə qayıt
        </a>
      </div>
    </div>
  );
};

export default NotFound;
