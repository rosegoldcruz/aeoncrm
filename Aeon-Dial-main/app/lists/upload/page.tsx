import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UploadListPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-orange-500">Upload Lead List</h1>
        <p className="text-neutral-400 text-sm">Import leads from CSV file</p>
      </div>

      <div className="max-w-2xl bg-neutral-900 border border-neutral-800 rounded-lg p-8">
        <div className="border-2 border-dashed border-neutral-700 rounded-lg p-12 text-center">
          <Upload className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">Drop CSV file here</h3>
          <p className="text-sm text-neutral-400 mb-4">or click to browse</p>
          <Button className="bg-orange-500 hover:bg-orange-600">Select File</Button>
        </div>

        <div className="mt-6 p-4 bg-neutral-800 rounded">
          <h4 className="text-sm font-medium text-white mb-2">CSV Format Requirements:</h4>
          <ul className="text-xs text-neutral-400 space-y-1">
            <li>• First row must contain column headers</li>
            <li>• Required columns: phone_number, first_name, last_name</li>
            <li>• Optional columns: email, address, city, state, zip</li>
            <li>• Phone numbers should be in format: +1234567890</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
