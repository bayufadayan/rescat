import React from 'react'
import ResultTable from './results-analytics/result-table'
import MetricBar from './results-analytics/metric-bar'
import FinalScore from './results-analytics/final-score'

export default function AnalysisResultCard() {
    return (
        <div className='flex flex-col w-full rounded-2xl px-4 py-3 shadow-lg overflow-hidden bg-white items-center justify-center gap-4'>
            <h3 className='text-[#074DE5] font-bold'>Hasil Analisis</h3>
            <ResultTable/>
            <MetricBar/>
            <FinalScore/>
        </div>
    )
}
