import React from 'react';
import { list } from './Data';

const Chip = () => {
    const [chipValue, setChipValue] = React.useState('');
    const [chipList, setChipList] = React.useState([]);
    const [updatedList, setUpdatedList] = React.useState([...list]);
    const [highlightedChipIndex, setHighlightedChipIndex] = React.useState(-1);

    const handleOptionClick = (value) => {
        setChipList((prevChipList) => {
            const uniqueChipList = [...prevChipList, value];
            return [...uniqueChipList];
        });
        setUpdatedList((prevUpdatedList) => {
            return updatedList.filter((chip) => chip.toLowerCase() !== value.toLowerCase());
        });
        setChipValue('');
        setHighlightedChipIndex(-1);
    };

    const handleChipClose = (item) => {
        setUpdatedList((prevUpdatedList) => {
            return [...prevUpdatedList, item];
        });
        setChipList((prevChipList) => {
            return chipList.filter((chip) => chip.toLowerCase() !== item.toLowerCase());
        });
        setHighlightedChipIndex(-1);
    };

    const handleBackspace = (event) => {
        if (event.keyCode === 8 && chipList.length > 0 && chipValue === '') {
            
            if (highlightedChipIndex === -1) {
                setHighlightedChipIndex(chipList.length - 1);
            } 
            else {
                const lastChip = chipList[highlightedChipIndex];
                setChipList((prevChipList) => prevChipList.slice(0, -1));
                setUpdatedList((prevUpdatedList) => [...prevUpdatedList, lastChip]);
                setHighlightedChipIndex(-1);
            }
        }
    };

    return (
        <div className='border-solid bg-violet-300 hover:shadow-lg hover:shadow-violet-950 rounded-2xl mx-10 my-20 px-20 py-20 flex flex-col justify-between'>
            <div className='flex flex-wrap'>
                <div className='flex flex-wrap '>
                    {chipList.map((item, index) => (
                        <div
                            key={item}
                            className={`bg-yellow-100 px-4 mr-2 mb-2 flex items-center ${highlightedChipIndex === index ? 'border-2 border-violet-900 rounded-xl' : ''}`}>
                            <span>{item}</span>
                            <button className="text-red-400 text-right pl-4 ml-2" onClick={() => handleChipClose(item)}>X</button>
                        </div>
                    ))}
                </div>
                <div>
                    <input
                        className='border-s-slate-500'
                        type='text'
                        value={chipValue}
                        onChange={(event) => setChipValue(event.target.value)}
                        onKeyDown={(e) => handleBackspace(e)} />
                    <div className=''>
                        {updatedList
                            .filter((listItem) => {
                                const findItem = chipValue.toLowerCase();
                                const matchedItem = listItem.toLowerCase();
                                return findItem && matchedItem.includes(findItem) && findItem !== matchedItem;
                            })
                            .map((item) => (
                                <h4
                                    className='cursor-pointer text-slate-900 hover:text-slate-600 text-pretty'
                                    key={item}
                                    onClick={() => handleOptionClick(item)}>
                                    {item}
                                </h4>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chip;
