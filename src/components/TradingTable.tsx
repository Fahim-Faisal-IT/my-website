import React from 'react';

const TradingTable = () => {
  const tradingPairs = [
    { pair: 'BTC/USDT', price: '43,250.00', change: '+2.45' },
    { pair: 'ETH/USDT', price: '2,890.50', change: '+1.82' },
    { pair: 'BNB/USDT', price: '465.75', change: '-0.65' },
    { pair: 'SOL/USDT', price: '125.30', change: '+3.21' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-black">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Pair</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-400">Last Price</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-400">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {tradingPairs.map((pair, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="px-6 py-4 text-sm font-medium text-white">{pair.pair}</td>
              <td className="px-6 py-4 text-right text-sm text-white">${pair.price}</td>
              <td className={`px-6 py-4 text-right text-sm ${pair.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {pair.change}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradingTable;