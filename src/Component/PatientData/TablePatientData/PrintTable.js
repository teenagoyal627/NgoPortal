import React from 'react';
import { FaPrint } from 'react-icons/fa';

const PrintTable = ({ printTableRef }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const printContent = printTableRef.current.innerHTML;
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>NGO Patient Data</title>
          <style>
            /* Add your custom styles for printing here */
            table {
              width: 100%;
              border-collapse: collapse;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 8px;
              text-align: left;
            }
            /* Hide buttons or other elements for print */
            .no-print {
              display: none;
            }
          </style>
        </head>
        <body>
          <h1>Patient Data</h1>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <button
      type="button"
      className="filter_button"
      style={{ marginTop: '1.5rem' }}
      onClick={handlePrint}
    >
      <FaPrint /> Print all Patients Data
    </button>
  );
};

export default PrintTable;
