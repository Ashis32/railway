import React, { useState } from 'react';

export default function FormGAZApplication() {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeNo: '',
    designation: '',
    dob: '',
    department: '',
    station: '',
    billUnit: '',
    address: '',
    railwayContact: '',
    mobile: '',
    reason: '',
    emergencyName: '',
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
  
    const formPayload = new FormData();
  
    // Append all form fields
    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }
  
    // Append family list as JSON string
    formPayload.append('familyList', JSON.stringify(familyList));
  
    try {
      const res = await fetch('http://localhost:5173/backend/submit_gazetted.php', {
        method: 'POST',
        body: formPayload,
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert(`✅ Form submitted successfully!\nYour Application No: ${data.applicationNo}`);
      } else {
        alert(`❌ Error: ${data.message || 'Submission failed'}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting form. Check console for more details.');
    }
  };
  
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-green-800">
        Employee Registration Form (Gazetted)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee Details */}
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
            <label className="text-sm text-black font-bold">Department</label>
            <select name="department" value={formData.Department} onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">Select Department</option>
                    <option value="ACCOUNTS">ACCOUNTS</option>
                    <option value="COMMERCIAL">COMMERCIAL</option>
                    <option value="ELECTRICAL">ELECTRICAL</option>
                    <option value="ENGINEERING">ENGINEERING</option>
                    <option value="GA">GA</option>
                    <option value="MECHANICAL">MECHANICAL</option>
                    <option value="MEDICAL">MEDICAL</option>
                    <option value="OPERATING">OPERATING</option>
                    <option value="PERSONNEL">PERSONNEL</option>
                    <option value="RRB">RRB</option>
                    <option value="S&T">S&T</option>
                    <option value="SAFETY">SAFETY</option>
                    <option value="SECURITY">SECURITY</option>
                    <option value="STORES">STORES</option>
 
            </select>
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
          <div>
            <label className="text-sm text-black font-bold">BillUnit</label>
            <select name="billUnit" value={formData.BillUnit} onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">Select BillUnit</option>
                    <option value="3101001">3101001</option>
                    <option value="3101002">3101002</option>
                    <option value="3101003">3101003</option>
                    <option value="3101004">3101004</option>
                    <option value="3101010">3101010</option>
                    <option value="3101023">3101023</option>
                    <option value="3101024">3101024</option>
                    <option value="3101025">3101025</option>
                    <option value="3101026">3101026</option>
                    <option value="3101027">3101027</option>
                    <option value="3101065">3101065</option>
                    <option value="3101066">3101066</option>
                    <option value="3101165">3101165</option>
                    <option value="3101166">3101166</option>
                    <option value="3101285">3101285</option>
                    <option value="3101286">3101286</option>
                    <option value="3101287">3101287</option>
                    <option value="3101288">3101288</option>
                    <option value="3101470">3101470</option>
                    
                    
 
            </select>
          </div>
          <div>
            <label className="text-sm text-black font-bold">Residential Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="text-sm text-black font-bold">Rly Contact Number</label>
            <input name="railwayContact" value={formData.railwayContact} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="text-sm text-black font-bold">Mobile Number</label>
            <input name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="text-sm text-black font-bold">Reason for Application</label>
            <input name="reason" value={formData.reason} onChange={handleChange} className="w-full border p-2 rounded" required />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-black font-bold">Emergency Contact Name</label>
              <input name="emergencyName" value={formData.emergencyName} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="text-sm text-black font-bold">Emergency Contact Number</label>
              <input name="emergencyNumber" value={formData.emergencyNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-black font-bold">Upload Photo</label>
              <input type="file" name="photo" onChange={handleChange} accept="image/*" className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="text-sm text-black font-bold">Upload Signature</label>
              <input type="file" name="signature" onChange={handleChange} accept="image/*" className="w-full border p-2 rounded" required />
            </div>
          </div>

          <p className="text-xs text-red-500">
            NOTE: File name should be in format <i>Firstname_photo</i> and <i>Firstname_sign</i> (jpg/jpeg/png). Avoid mobile scans or selfies.
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