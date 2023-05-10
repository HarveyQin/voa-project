import React from 'react';
import { ChartsHeader, Pie as PieChart } from '../../components';

// export const pieChartData = [
//   { x: 'Labour', y: 18, text: '18%' },
//   { x: 'Legal', y: 8, text: '8%' },
//   { x: 'Production', y: 15, text: '15%' },
//   { x: 'License', y: 11, text: '11%' },
//   { x: 'Facilities', y: 18, text: '18%' },
//   { x: 'Taxes', y: 14, text: '14%' },
//   { x: 'Insurance', y: 16, text: '16%' },
// ];

const testData = [[{ "sum_id": 1, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 1, "visitor_id": 1 }, { "sum_id": 2, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 2, "visitor_id": 2 }, { "sum_id": 3, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 3, "visitor_id": 3 }, { "sum_id": 4, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 4, "visitor_id": 4 }, { "sum_id": 5, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 5, "visitor_id": 5 }, { "sum_id": 6, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 6, "visitor_id": 6 }, { "sum_id": 7, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 7, "visitor_id": 7 }, { "sum_id": 8, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 8, "visitor_id": 8 }, { "sum_id": 9, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 9, "visitor_id": 7 }, { "sum_id": 10, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 10, "visitor_id": 6 }, { "sum_id": 11, "amount": 50, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 11, "visitor_id": 5 }, { "sum_id": 12, "amount": 100, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 12, "visitor_id": 4 }, { "sum_id": 13, "amount": 150, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Parking", "source_id": 13, "visitor_id": 3 }, { "sum_id": 14, "amount": 6, "vist_date": "2023-05-01T04:00:00.000Z", "source": "Store", "source_id": 1, "visitor_id": 1 }], { "fieldCount": 0, "affectedRows": 0, "insertId": 0, "serverStatus": 34, "warningCount": 0, "message": "", "protocol41": true, "changedRows": 0 }];

function calculatePercentage(data) {
  const sourceCount = {};
  let totalCount = 0;

  data.forEach((item) => {
    const { source } = item;
    sourceCount[source] = (sourceCount[source] || 0) + 1;
    totalCount++;
  });

  const percentageData = Object.entries(sourceCount).map(([source, count]) => ({
    x: source,
    y: count,
    text: `${((count / totalCount) * 100).toFixed(0)}%`,
  }));

  return percentageData;
}

const Pie = () => {

  //TODO add a datepicker to select the date

  //TODO get the data of the selected date from the database

  const sourcePercentage = calculatePercentage(testData[0]);
  // console.log('sourcePercentage');
  // console.log(sourcePercentage);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Summary" title="Payment Summary" />
      <div className="w-full">
        <PieChart id="chart-pie" data={sourcePercentage} legendVisiblity height="full" />
      </div>
    </div>
  );
}

export default Pie;
