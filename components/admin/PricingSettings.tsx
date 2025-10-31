import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { PricingSection } from '../../types';
import { AiGenerateButton } from './AiGenerateButton';
import { v4 as uuidv4 } from 'uuid';

const PricingSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState<PricingSection>(content.pricing);

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handlePlanChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newPlans = [...formData.plans];
        const plan: any = newPlans[index];
        plan[name] = type === 'checkbox' ? checked : value;
        setFormData(prev => ({...prev, plans: newPlans}));
    };

    const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
        const newPlans = [...formData.plans];
        newPlans[planIndex].features[featureIndex] = value;
        setFormData(prev => ({ ...prev, plans: newPlans }));
    };

    const addFeature = (planIndex: number) => {
        const newPlans = [...formData.plans];
        newPlans[planIndex].features.push('New Feature');
        setFormData(prev => ({ ...prev, plans: newPlans }));
    };
    
    const removeFeature = (planIndex: number, featureIndex: number) => {
        const newPlans = [...formData.plans];
        newPlans[planIndex].features.splice(featureIndex, 1);
        setFormData(prev => ({ ...prev, plans: newPlans }));
    };

    const addPlan = () => {
        const newPlan = { id: uuidv4(), name: "New Plan", price: "99", period: "mo", description: "A new plan description.", features: ["Feature 1"], isFeatured: false };
        setFormData(prev => ({ ...prev, plans: [...prev.plans, newPlan] }));
    };

    const removePlan = (id: string) => {
        setFormData(prev => ({ ...prev, plans: prev.plans.filter(p => p.id !== id) }));
    };

    const handleSave = () => {
        updateContent({ ...content, pricing: formData });
        alert('Pricing settings saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Pricing Settings</h2>
            
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Section Header</h3>
                <div className="space-y-4">
                     <input type="text" name="title" value={formData.title} onChange={handleHeaderChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" placeholder="Title" />
                     <input type="text" name="subtitle" value={formData.subtitle} onChange={handleHeaderChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" placeholder="Subtitle" />
                </div>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Pricing Plans</h3>
                    <button onClick={addPlan} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-cyan-500/40">Add Plan</button>
                </div>
                <div className="space-y-6">
                    {formData.plans.map((plan, pIndex) => (
                        <div key={plan.id} className="p-4 bg-gray-800/30 rounded-md space-y-3 border border-gray-700/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="name" value={plan.name} onChange={(e) => handlePlanChange(pIndex, e)} placeholder="Plan Name" className="bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                <input type="text" name="description" value={plan.description} onChange={(e) => handlePlanChange(pIndex, e)} placeholder="Description" className="bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                <div className="flex items-center gap-2">
                                    <input type="text" name="price" value={plan.price} onChange={(e) => handlePlanChange(pIndex, e)} placeholder="Price" className="w-24 bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                    <span>/</span>
                                    <input type="text" name="period" value={plan.period} onChange={(e) => handlePlanChange(pIndex, e)} placeholder="mo" className="w-20 bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="isFeatured" checked={plan.isFeatured} onChange={(e) => handlePlanChange(pIndex, e)} id={`featured-${pIndex}`} className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded" />
                                    <label htmlFor={`featured-${pIndex}`}>Featured Plan</label>
                                </div>
                            </div>
                            <div className="space-y-2 pt-3 border-t border-gray-700/50">
                                <h4 className="text-sm font-semibold">Features</h4>
                                {plan.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-center gap-2">
                                        <input type="text" value={feature} onChange={(e) => handleFeatureChange(pIndex, fIndex, e.target.value)} className="flex-1 bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                        <button onClick={() => removeFeature(pIndex, fIndex)} className="text-red-500 hover:text-red-400 text-xs">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addFeature(pIndex)} className="text-cyan-400 hover:text-cyan-300 text-sm">+ Add Feature</button>
                            </div>
                             <button onClick={() => removePlan(plan.id)} className="text-red-500 hover:text-red-400 font-semibold text-sm pt-2">Remove Plan</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} className="bg-white text-black px-6 py-2 rounded-md font-semibold">Save Changes</button>
            </div>
        </div>
    );
};

export default PricingSettings;
