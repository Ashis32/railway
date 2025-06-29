import React, { useState } from 'react';
import { supabase } from '../supabaseClient';


export default function FormGAZApplication() {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeNo: '',
    designation: '',
    dob: '',
    station: '',
    emergencyNumber: '',
    photo: null,
    signature: null,
  });

  const [familyList, setFamilyList] = useState([
    { name: '', bloodGroup: '', relationship: 'SELF', dob: '', idMark: '' }
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleFamilyChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...familyList];
    updated[index][name] = value;
    setFamilyList(updated);
  };

  const addFamilyMember = () => {
    setFamilyList([...familyList, { name: '', bloodGroup: '', relationship: '', dob: '', idMark: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const {
      photo,
      signature,
      emergencyNumber,
      ...rest
    } = formData;
  
    const applicationId = crypto.randomUUID();
  
    // 📤 Upload Photo
    const photoPath = `photos/${rest.employeeNo}_photo.${photo.name.split('.').pop()}`;
    const { data: photoData, error: photoError } = await supabase.storage
      .from('gazetted-assets')
      .upload(photoPath, photo, {
        cacheControl: '3600',
        upsert: true,
      });
  
    if (photoError) {
      console.error('Photo upload error:', photoError);
      alert('❌ Photo upload failed.');
      return;
    }
  
    // 📤 Upload Signature
    const signaturePath = `signatures/${rest.employeeNo}_sign.${signature.name.split('.').pop()}`;
    const { data: signData, error: signError } = await supabase.storage
      .from('gazetted-assets')
      .upload(signaturePath, signature, {
        cacheControl: '3600',
        upsert: true,
      });
  
    if (signError) {
      console.error('Signature upload error:', signError);
      alert('❌ Signature upload failed.');
      return;
    }
  
    // ✅ Insert into gazetted_forms
    const { data: formInsert, error: formInsertError } = await supabase
      .from('gazetted_forms')
      .insert([
        {
          id: applicationId,
          ...rest,
          emergency_number: emergencyNumber, // 🔥 Use proper column name
          photo_url: photoData.path,
          signature_url: signData.path,
        },
      ])
      .select()
      .single();
  
    if (formInsertError) {
      console.error('Form insertion error:', formInsertError);
      alert('❌ Failed to save form data.');
      return;
    }
  
    // ✅ Insert family members
    for (let member of familyList) {
      await supabase.from('gazetted_family').insert([
        {
          form_id: applicationId,
          ...member,
        },
      ]);
    }
  
    alert(`✅ Form submitted successfully!\nYour Application No: ${formInsert.id}`);
  };
  
  
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-green-800">
        Employee Registration Form (Gazetted)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-black font-bold">Employee Name</label>
            <input name="employeeName" value={formData.employeeName} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="text-sm text-black font-bold">Employee No.</label>
            <input name="employeeNo" value={formData.employeeNo} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="text-sm text-black font-bold">Designation</label>
            <input name="designation" value={formData.designation} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="text-sm text-black font-bold">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="text-sm text-black font-bold">Station</label>
            <select name="station" value={formData.station} onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">Select Station</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
              <option value="Cuttack">Cuttack</option>
              <option value="Sambalpur">Sambalpur</option>
            </select>
          </div>
        </div>

        {/* Family Section */}
        <div className="bg-red-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Family Member Details (As per pass rule)</h3>

          {familyList.map((member, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
              <input name="name" placeholder="Name" value={member.name} onChange={(e) => handleFamilyChange(index, e)} className="border p-2 rounded" />
              <select name="bloodGroup" value={member.bloodGroup} onChange={(e) => handleFamilyChange(index, e)} className="border p-2 rounded">
                <option value="">Blood Group</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
              <input name="relationship" placeholder="Relationship" value={member.relationship} onChange={(e) => handleFamilyChange(index, e)} className="border p-2 rounded" />
              <input type="date" name="dob" value={member.dob} onChange={(e) => handleFamilyChange(index, e)} className="border p-2 rounded" />
              <input name="idMark" placeholder="Identification mark(s)" value={member.idMark} onChange={(e) => handleFamilyChange(index, e)} className="border p-2 rounded" />
            </div>
          ))}

          <button type="button" onClick={addFamilyMember} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            Add Family Member
          </button>
        </div>

        {/* Emergency & Uploads */}
        <div className="bg-blue-100 p-4 rounded space-y-4">
          <div>
            <label className="text-sm text-black font-bold">Emergency Contact Number</label>
            <input name="emergencyNumber" value={formData.emergencyNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-black font-bold">Upload Photo (.jpg/.png only)</label>
              <input type="file" name="photo" onChange={handleChange} accept=".jpg,.jpeg,.png" className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="text-sm text-black font-bold">Upload Signature (.jpg/.png only)</label>
              <input type="file" name="signature" onChange={handleChange} accept=".jpg,.jpeg,.png" className="w-full border p-2 rounded" required />
            </div>
          </div>

          <p className="text-xs text-red-500">
            NOTE: File name should be in format <i>Firstname_photo</i> and <i>Firstname_sign</i>. Only .jpg, .jpeg, .png allowed.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 pt-4">
          <button type="submit" className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700">SUBMIT</button>
          <button type="reset" className="bg-black-500 text-white px-8 py-2 rounded hover:bg-gray-600">CLEAR</button>
        </div>
      </form>
    </div>
  );
}
