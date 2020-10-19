<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class UploadsController extends Controller 
{
    public function uploadAvatar(Request $request) {
        $request->validate([
            'image' => 'required|image:jpeg,png,gif,svg|max:2048',
        ]);

        $uploadFolders  = 'users';
        $image          = $request->file('image');
        $imageUploadPath= $image->store($uploadFolders, 'public');
        $uploadImageReponse = array(
            "image_name"    => basename($imageUploadPath),
            "image_url"     => Storage::disk('public')->url($imageUploadPath),
            "mime"          => $image->getClientMimeType()
        );

        return sendCustomResponse('File Uploaded Successfully', 'success',   200, $uploadedImageResponse);
    }    
}
