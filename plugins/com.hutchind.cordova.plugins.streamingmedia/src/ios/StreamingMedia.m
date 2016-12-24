#import "StreamingMedia.h"
#import <Cordova/CDV.h>


@interface StreamingMedia()
	- (void)parseOptions:(NSDictionary *) options type:(NSString *) type;
	- (void)play:(CDVInvokedUrlCommand *) command type:(NSString *) type;
	- (void)setBackgroundColor:(NSString *)color;
	- (void)setImage:(NSString*)imagePath withScaleType:(NSString*)imageScaleType;
	- (UIImage*)getImage: (NSString *)imageName;
	- (void)startPlayer:(NSString*)uri;
	- (void)moviePlayBackDidFinish:(NSNotification*)notification;
	- (void)cleanup;
@end

@implementation StreamingMedia {
	NSString* callbackId;
	MPMoviePlayerController *moviePlayer;
	BOOL shouldAutoClose;
	UIColor *backgroundColor;
	UIImageView *imageView;
    BOOL mustWatch;
    BOOL *initFullscreen;
    NSInteger seek;
    UIView *bannerView;
    UIButton *closeButton;
    UIButton *loadingText;
}

NSString * const TYPE_VIDEO = @"VIDEO";
NSString * const TYPE_AUDIO = @"AUDIO";
NSString * const DEFAULT_IMAGE_SCALE = @"center";
NSString * const ERROR_DONE = @"user terminated play";

/**
- (CDVPlugin*) initWithWebView:(UIWebView*)theWebView {
 	NSLog(@"-------------------------------------------------");
 	NSLog(@"INITWITHWEBVIEW");
 	self = (StreamingMedia*)[super initWithWebView:theWebView];
 	return self;
 }
**/

-(void)parseOptions:(NSDictionary *)options type:(NSString *) type {
    // Common options
    if (![options isKindOfClass:[NSNull class]] && [options objectForKey:@"shouldAutoClose"]) {
        shouldAutoClose = [[options objectForKey:@"shouldAutoClose"] boolValue];
    } else {
        shouldAutoClose = true;
    }
    if (![options isKindOfClass:[NSNull class]] && [options objectForKey:@"mustWatch"]) {
        mustWatch = [[options objectForKey:@"mustWatch"] boolValue];
    } else {
        mustWatch = true;
    }
    if (![options isKindOfClass:[NSNull class]] && [options objectForKey:@"seek"]) {
        seek = [[options objectForKey:@"seek"] integerValue];
    } else {
        seek = 0;
    }
	if (![options isKindOfClass:[NSNull class]] && [options objectForKey:@"bgColor"]) {
		[self setBackgroundColor:[options objectForKey:@"bgColor"]];
	} else {
		backgroundColor = [UIColor blackColor];
	}

    if (![options isKindOfClass:[NSNull class]] && [options objectForKey:@"initFullscreen"]) {
        initFullscreen = [[options objectForKey:@"initFullscreen"] boolValue];
    } else {
        initFullscreen = false;
    }

	if ([type isEqualToString:TYPE_AUDIO]) {
		// bgImage
		// bgImageScale
		if (![options isKindOfClass:[NSNull class]] && [options objectForKey:@"bgImage"]) {
			NSString *imageScale = DEFAULT_IMAGE_SCALE;
			if (![options isKindOfClass:[NSNull class]] && [options objectForKey:@"bgImageScale"]) {
				imageScale = [options objectForKey:@"bgImageScale"];
			}
			[self setImage:[options objectForKey:@"bgImage"] withScaleType:imageScale];
		}
		// bgColor
		if (![options isKindOfClass:[NSNull class]] && [options objectForKey:@"bgColor"]) {
			NSLog(@"Found option for bgColor");
			[self setBackgroundColor:[options objectForKey:@"bgColor"]];
		} else {
			backgroundColor = [UIColor blackColor];
		}
	}
	// No specific options for video yet
}

-(void)play:(CDVInvokedUrlCommand *) command type:(NSString *) type {
	callbackId = command.callbackId;
	NSString *mediaUrl  = [command.arguments objectAtIndex:0];
	[self parseOptions:[command.arguments objectAtIndex:1] type:type];

	[self startPlayer:mediaUrl];
}

-(void)pause:(CDVInvokedUrlCommand *) command type:(NSString *) type {
    callbackId = command.callbackId;
    if (moviePlayer) {
        [moviePlayer pause];
    }
}

-(void)resume:(CDVInvokedUrlCommand *) command type:(NSString *) type {
    callbackId = command.callbackId;
    if (moviePlayer) {
        [moviePlayer play];
    }
}

-(void)stop:(CDVInvokedUrlCommand *) command type:(NSString *) type {
    callbackId = command.callbackId;
    if (moviePlayer) {
        [moviePlayer stop];
    }
}

-(void)playVideo:(CDVInvokedUrlCommand *) command {
	[self play:command type:[NSString stringWithString:TYPE_VIDEO]];
}

-(void)playAudio:(CDVInvokedUrlCommand *) command {
	[self play:command type:[NSString stringWithString:TYPE_AUDIO]];
}

-(void)pauseAudio:(CDVInvokedUrlCommand *) command {
    [self pause:command type:[NSString stringWithString:TYPE_AUDIO]];
}

-(void)resumeAudio:(CDVInvokedUrlCommand *) command {
    [self resume:command type:[NSString stringWithString:TYPE_AUDIO]];
}

-(void)stopAudio:(CDVInvokedUrlCommand *) command {
    [self stop:command type:[NSString stringWithString:TYPE_AUDIO]];
}

-(void) setBackgroundColor:(NSString *)color {
	if ([color hasPrefix:@"#"]) {
		// HEX value
		unsigned rgbValue = 0;
		NSScanner *scanner = [NSScanner scannerWithString:color];
		[scanner setScanLocation:1]; // bypass '#' character
		[scanner scanHexInt:&rgbValue];
		backgroundColor = [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0];
	} else {
		// Color name
		NSString *selectorString = [[color lowercaseString] stringByAppendingString:@"Color"];
		SEL selector = NSSelectorFromString(selectorString);
		UIColor *colorObj = [UIColor blackColor];
		if ([UIColor respondsToSelector:selector]) {
			colorObj = [UIColor performSelector:selector];
		}
		backgroundColor = colorObj;
	}
}

-(UIImage*)getImage: (NSString *)imageName {
	UIImage *image = nil;
	if (imageName != (id)[NSNull null]) {
		if ([imageName hasPrefix:@"http"]) {
			// Web image
			image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:imageName]]];
		} else if ([imageName hasPrefix:@"www/"]) {
			// Asset image
			image = [UIImage imageNamed:imageName];
		} else if ([imageName hasPrefix:@"file://"]) {
			// Stored image
			image = [UIImage imageWithData:[NSData dataWithContentsOfFile:[[NSURL URLWithString:imageName] path]]];
		} else if ([imageName hasPrefix:@"data:"]) {
			// base64 encoded string
			NSURL *imageURL = [NSURL URLWithString:imageName];
			NSData *imageData = [NSData dataWithContentsOfURL:imageURL];
			image = [UIImage imageWithData:imageData];
		} else {
			// explicit path
			image = [UIImage imageWithData:[NSData dataWithContentsOfFile:imageName]];
		}
	}
	return image;
}

- (void)orientationChanged:(NSNotification *)notification {
	
	CGFloat width = [UIScreen mainScreen].bounds.size.width;
	CGFloat height = [UIScreen mainScreen].bounds.size.height;
	CGRect newSize;

	newSize = CGRectMake(0, 0 ,width, height);  
	moviePlayer.view.frame = newSize;
	/*
	NSLog(@"rotation happening !!");
	NSLog(@" w :  %f", width);
	NSLog(@" h :  %f", height);
	*/
	/*
	if (UIDeviceOrientationIsLandscape([UIDevice currentDevice].orientation))
	{

	}
	else // (UIDeviceOrientationIsPortrait([UIDevice currentDevice].orientation)) OR other 
	{

	}
	*/




	// reposition custom UI
	
	CGRect parentFrame = self.viewController.view.frame;
	
	CGRect frame = closeButton.frame;
	frame.origin.x = parentFrame.size.width-35;
	frame.origin.y = parentFrame.size.height - 38;
	closeButton.frame = frame;

	frame = loadingText.frame;
	frame.origin.x = (parentFrame.size.width/2)-60;
	frame.origin.y = (parentFrame.size.height/2)-30;
	loadingText.frame = frame;

	if (mustWatch) {
		frame = bannerView.frame;
		frame.origin.x = 80;
		frame.origin.y = parentFrame.size.height - 60;
		bannerView.frame = frame;
	}

	// -- 


	moviePlayer.scalingMode = MPMovieScalingModeAspectFit;


    if (imageView != nil) {
        // adjust imageView for rotation
        imageView.bounds = moviePlayer.backgroundView.bounds;
        imageView.frame = moviePlayer.backgroundView.frame;
    }
}


- (void)bufferStateChange:(NSNotification *)notification {
	if (moviePlayer.loadState == MPMovieLoadStatePlayable | MPMovieLoadStatePlaythroughOK) {
		[loadingText setTitle:@"" forState:UIControlStateNormal];
	} else {
		[loadingText setTitle:@"Buffering..." forState:UIControlStateNormal];
	}
}


-(void)setImage:(NSString*)imagePath withScaleType:(NSString*)imageScaleType {
	imageView = [[UIImageView alloc] initWithFrame:self.viewController.view.bounds];
	if (imageScaleType == nil) {
		NSLog(@"imagescaletype was NIL");
		imageScaleType = DEFAULT_IMAGE_SCALE;
	}
	if ([imageScaleType isEqualToString:@"stretch"]){
		// Stretches image to fill all available background space, disregarding aspect ratio
		imageView.contentMode = UIViewContentModeScaleToFill;
		moviePlayer.backgroundView.contentMode = UIViewContentModeScaleToFill;
	} else if ([imageScaleType isEqualToString:@"fit"]) {
		// Stretches image to fill all possible space while retaining aspect ratio
		imageView.contentMode = UIViewContentModeScaleAspectFit;
		moviePlayer.backgroundView.contentMode = UIViewContentModeScaleAspectFit;
	} else {
		// Places image in the center of the screen
		imageView.contentMode = UIViewContentModeCenter;
		moviePlayer.backgroundView.contentMode = UIViewContentModeCenter;
	}

	[imageView setImage:[self getImage:imagePath]];
}

-(void)startPlayer:(NSString*)uri {
	NSURL *url = [NSURL URLWithString:uri];

    moviePlayer =  [[MPMoviePlayerController alloc] initWithContentURL:url];
    [moviePlayer setScalingMode:MPMovieScalingModeAspectFit];

    if (seek > 0) {
        moviePlayer.initialPlaybackTime = seek / 1000.0;
    }

	// Listen for playback finishing
	[[NSNotificationCenter defaultCenter] addObserver:self
											 selector:@selector(moviePlayBackDidFinish:)
												 name:MPMoviePlayerPlaybackDidFinishNotification
											   object:moviePlayer];
	// Listen for click on the "Done" button
	[[NSNotificationCenter defaultCenter] addObserver:self
											 selector:@selector(doneButtonClick:)
												 name:MPMoviePlayerWillExitFullscreenNotification
											   object:nil];
	// Listen for orientation change
	[[NSNotificationCenter defaultCenter] addObserver:self
											 selector:@selector(orientationChanged:)
												 name:UIDeviceOrientationDidChangeNotification
                                               object:nil];

	// Listen for bufferring start/stop
	[[NSNotificationCenter defaultCenter] addObserver:self
											 selector:@selector(bufferStateChange:)
												 name:MPMoviePlayerLoadStateDidChangeNotification
                                               object:nil];

	
    
	moviePlayer.shouldAutoplay = YES;
	if (imageView != nil) {
		[moviePlayer.backgroundView setAutoresizesSubviews:YES];
		[moviePlayer.backgroundView addSubview:imageView];
	}
	moviePlayer.backgroundView.backgroundColor = backgroundColor;
	[self.viewController.view addSubview:moviePlayer.view];
    
    CGRect parentFrame = self.viewController.view.frame;
    if (mustWatch) {
        bannerView = [[UIView alloc] initWithFrame:CGRectMake(80, parentFrame.size.height - 60, parentFrame.size.width - 80, 60)];
        [bannerView setBackgroundColor:[UIColor clearColor]];
        [self.viewController.view addSubview:bannerView];
    }
    closeButton = [[UIButton alloc] initWithFrame:CGRectMake(parentFrame.size.width-35, parentFrame.size.height - 38, 32, 32)];
    [closeButton setTitle:@"X" forState:UIControlStateNormal];
    [closeButton addTarget:self action:@selector(closeButtonTapped:) forControlEvents:UIControlEventTouchUpInside];
    [closeButton setReversesTitleShadowWhenHighlighted:YES];
    [self.viewController.view addSubview:closeButton];
    
    loadingText = [[UIButton alloc] initWithFrame:CGRectMake((parentFrame.size.width/2)-60, (parentFrame.size.height/2)-30, 120, 32)];
    [loadingText setTitle:@"Buffering..." forState:UIControlStateNormal];
    [self.viewController.view addSubview:loadingText];


	// Note: animating does a fade to black, which may not match background color
    moviePlayer.view.frame = self.viewController.view.frame;
    if (initFullscreen) {
        [moviePlayer setFullscreen:YES animated:NO];
    } else {
        [moviePlayer setFullscreen:NO animated:NO];
    }
}

- (void) closeButtonTapped: (id) sender {
    [self doneButtonClick:nil];
}

- (void) moviePlayBackDidFinish:(NSNotification*)notification {
	NSDictionary *notificationUserInfo = [notification userInfo];
	NSNumber *resultValue = [notificationUserInfo objectForKey:MPMoviePlayerPlaybackDidFinishReasonUserInfoKey];
	MPMovieFinishReason reason = [resultValue intValue];
	NSString *errorMsg;
	if (reason == MPMovieFinishReasonPlaybackError) {
		NSError *mediaPlayerError = [notificationUserInfo objectForKey:@"error"];
		if (mediaPlayerError) {
			errorMsg = [mediaPlayerError localizedDescription];
		} else {
			errorMsg = @"Unknown error.";
		}
		NSLog(@"Playback failed: %@", errorMsg);
	}

	if (shouldAutoClose || [errorMsg length] != 0) {
		[self cleanup];
		CDVPluginResult* pluginResult;
		if ([errorMsg length] != 0) {
			NSTimeInterval current = [moviePlayer currentPlaybackTime];
			NSInteger mSec = current * 1000;
			pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{@"errMsg": ERROR_DONE, @"last": [NSNumber numberWithInteger:mSec]}];
		} else {
			pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:true];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
	}
}

-(void)doneButtonClick:(NSNotification*)notification{
    NSTimeInterval current = [moviePlayer currentPlaybackTime];
    NSInteger mSec = current * 1000;
	[self cleanup];

    CDVPluginResult *pluginResult;
    if (mustWatch == YES) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{@"errMsg": ERROR_DONE, @"last": [NSNumber numberWithInteger:mSec]}];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:true];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}


- (void)cleanup {
	NSLog(@"Clean up");
	imageView = nil;
    initFullscreen = false;
	backgroundColor = nil;

	// Remove Done Button listener
	[[NSNotificationCenter defaultCenter]
							removeObserver:self
									  name:MPMoviePlayerWillExitFullscreenNotification
									object:nil];
	// Remove playback finished listener
	[[NSNotificationCenter defaultCenter]
							removeObserver:self
									  name:MPMoviePlayerPlaybackDidFinishNotification
									object:moviePlayer];
	// Remove orientation change listener
	[[NSNotificationCenter defaultCenter]
							removeObserver:self
									  name:UIDeviceOrientationDidChangeNotification
									object:nil];
	// Remove buffer state change listener
	[[NSNotificationCenter defaultCenter]
							removeObserver:self
									  name:MPMoviePlayerLoadStateDidChangeNotification
									object:nil];


	if (moviePlayer) {
		moviePlayer.fullscreen = NO;
		[moviePlayer setInitialPlaybackTime:-1];
		[moviePlayer stop];
		moviePlayer.controlStyle = MPMovieControlStyleNone;
		[moviePlayer.view removeFromSuperview];
		moviePlayer = nil;
        [closeButton removeFromSuperview];
        closeButton = nil;
        [loadingText removeFromSuperview];
        loadingText = nil;
	}
}
@end
