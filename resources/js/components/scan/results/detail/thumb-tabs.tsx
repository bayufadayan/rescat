import React from "react";
import ThumbTabItem from "./thumb-tabs/thumb-tab-item";

export default function ThumbTabs() {
    return (
        <div className="relative">
            <div
                className="w-full flex gap-3 overflow-x-auto scroll-smooth px-4 py-2 custom-scroll"
                role="tablist"
                aria-label="Thumbnail tabs"
            >
                <ThumbTabItem>Tab 1</ThumbTabItem>
                <ThumbTabItem>Tab 2</ThumbTabItem>
                <ThumbTabItem>Tab 3</ThumbTabItem>
                <ThumbTabItem>Tab 4</ThumbTabItem>
                <ThumbTabItem>Tab 5</ThumbTabItem>
                <ThumbTabItem>Tab 6</ThumbTabItem>
                <ThumbTabItem>Tab 7</ThumbTabItem>
                <ThumbTabItem>Tab 8</ThumbTabItem>
            </div>
        </div>
    );
}
