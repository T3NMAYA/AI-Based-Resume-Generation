import React from 'react';

// New, working image URLs for the templates
const templates = [
    {
        id: 'classic',
        name: 'Classic Professional',
        imageUrl: 'https://i.imgur.com/r62T63W.png' // New Working Image
    },
    {
        id: 'modern',
        name: 'Modern Creative',
        imageUrl: 'https://i.imgur.com/dsmV5b5.png' // New Working Image
    },
    {
        id: 'minimalist',
        name: 'Simple Minimalist',
        imageUrl: 'https://i.imgur.com/VVoFzT8.png' // New Working Image
    },
];

function TemplateSelector({ onSelect, selectedTemplate }) {
    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Choose a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`card card-compact bg-neutral shadow-xl cursor-pointer transform hover:scale-105 transition-transform duration-300 ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => onSelect(template.id)}
                    >
                        <figure className="bg-white p-2">
                            <img
                                src={template.imageUrl}
                                alt={template.name}
                                className="h-64 w-full object-contain"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title justify-center">{template.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TemplateSelector;