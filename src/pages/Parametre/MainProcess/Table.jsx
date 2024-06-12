import './styles.css';
function Table({ status, openProcess, addstatus, addaction }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <div className="flex-grow flex overflow-x-hidden">
          <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
              <div className="flex items-center space-x-3 sm:mt-7 mt-4">
                <a onClick={() => openProcess(true)} className="px-3 border-b-2 text-gray-600 dark:text-gray-400 pb-1.5">
                  Add Process
                </a>
                <a onClick={() => addstatus(true)} className="px-3 border-b-2 text-gray-600 dark:text-gray-400 pb-1.5">
                  Add Status
                </a>
                <a onClick={() => addaction(true)} className="px-3 border-b-2 text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">
                  Add status label
                </a>
              </div>
            </div>
            <div className="sm:p-7 p-4">
              <div className="flex w-full items-center mb-7">
                <button className="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 mr-2 text-gray-400 dark:text-gray-600"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Last 30 days
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                  Filter by
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400">
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Process</th>
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Status</th>
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">
                      Actions
                    </th>
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Instruction</th>
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Departement</th>
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">SLA</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {status &&
                    status.map((index, key) => {
                      return (
                        <tr>
                          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">{index?.process?.title}</td>
                          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">{index?.title}</td>
                          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                            {index?.actions.length > 0 ? (
                              <ol>
                                {index?.actions.map((item) => {
                                  return <li key={item}>{item}</li>;
                                })}
                              </ol>
                            ) : (
                              'Aucune action'
                            )}
                          </td>
                          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                            {index?.instruction}
                          </td>
                          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800"> {index?.roles[0]?.title}</td>
                          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">{index?.sla}j</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
