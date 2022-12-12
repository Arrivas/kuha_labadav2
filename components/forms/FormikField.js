import React from 'react';
import { Formik } from 'formik';

function FormikField({ onSubmit, initialValues, validationSchema, children }) {
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {() => <>{children}</>}
      </Formik>
    </>
  );
}

export default FormikField;
