import React from "react";
import AnalysisGrid from "./analysis/analysis-grid";

export default function AnalysisTile() {
    return (
        <div className="w-full">
            <h4 className="text-gray-800 font-semibold mb-3">Analisis Gambar</h4>

            <div className="grid grid-cols-2 gap-3">
                <AnalysisGrid />
                <AnalysisGrid />
                <AnalysisGrid />
                <AnalysisGrid />
            </div>
        </div>
    );
}
